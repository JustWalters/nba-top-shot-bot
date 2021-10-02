const fs = require('fs');
const { getClient } = require('bottender');
const notifier = require('node-notifier');
const mongoose = require('mongoose');
const fcl = require('@onflow/fcl');
const t = require('@onflow/types');

const Moment = require('./models/Moment');
const Alert = require('./models/Alert');
require('./models/User'); // Need to import/execute so Mongoose registers model

const logger = require('./logger');
const { serialMatches } = require('./utils');

require('dotenv').config();

const { MONGODB_URI, FLOW_ACCESS_NODE, NODE_ENV } = process.env;

const POLL_INTERVAL_IN_MS = 20 * 1000;
const STORAGE_FILE_NAME = './storage';

process.setMaxListeners(2);

const GET_LISTED_MOMENT_SCRIPT = `
import TopShot from 0x0b2a3299cc857e29
import Market from 0xc1e4f4f4c4257510
pub struct Moment {
  pub var id: UInt64
  pub var playId: UInt32
  pub var setId: UInt32
  pub var serialNumber: UInt32
  init(moment: &TopShot.NFT) {
    self.id = moment.id
    self.playId = moment.data.playID
    self.setId = moment.data.setID
    self.serialNumber = moment.data.serialNumber
  }
}
pub fun main(momentId: UInt64, owner: Address): Moment {
  let acct = getAccount(owner)
  let collectionRef = acct.getCapability(/public/topshotSalev3Collection)!.borrow<&{Market.SalePublic}>() ?? panic("Could not borrow capability from public collection")
  let moment = collectionRef.borrowMoment(id: momentId) ?? panic("Could not borrow moment from public collection")
  return Moment(moment: moment)
}
`;
const GET_MOMENT_META_SCRIPT = `
import TopShot from 0x0b2a3299cc857e29
pub struct MomentMeta {
  pub var playMetaData: {String: String}?
  pub var setName: String?
  pub var setSeries: UInt32?
  init(playId: UInt32, setId: UInt32) {
    self.playMetaData = TopShot.getPlayMetaData(playID: playId)
    self.setName = TopShot.getSetName(setID: setId)
    self.setSeries = TopShot.getSetSeries(setID: setId)
  }
}
pub fun main(playId: UInt32, setId: UInt32): MomentMeta {
  return MomentMeta(playId: playId, setId: setId)
}
`;

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});
const notify = async (listing, moment, alert, client, user) => {
  const {
    playerName,
    playCategory,
    setName,
    setSeriesNumber,
    serialNumber,
    price,
  } = listing;

  const message = `${playerName} ${playCategory} ${setName} S${setSeriesNumber} #${serialNumber} - ${currencyFormatter.format(
    price,
  )}`;
  logger.info(`Sending notification for alert:${alert._id}: ${message}`);

  if (NODE_ENV === 'local') {
    notifier.notify({
      title: 'Moment for sale',
      message,
      // Basso, Frog, Glass
      sound: 'Purr' || (alert.importance ? 'Purr' : true),
      open: moment?.url || 'https://nbatopshot.com/search', // TODO: Link directly to listing
      timeout: 12 * 60 * 60,
    });
  }

  try {
    if (user.telegramChatId) {
      await client.sendMessage(
        user.telegramChatId,
        `*${playerName}*
        ${playCategory}
        ${setName} (Series ${setSeriesNumber})
        #${serialNumber}
        is just listed for *${currencyFormatter.format(price)}*!
        (which is within your budget ${currencyFormatter.format(alert.budget)})
        Grab it now at ${moment?.url || 'https://nbatopshot.com/search'}
        `,
        { parseMode: 'markdown' },
      );
    }
  } catch (error) {
    logger.error('Telegram', error);
  }

  logger.debug(`Sent notification for alert:${alert._id}`);
};

const start = async () => {
  const client = getClient('telegram');

  await mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  });

  fcl.config().put('accessNode.api', FLOW_ACCESS_NODE);

  let res;
  let lastEndHeight;
  let momentlessAlerts;

  try {
    const savedLastEndHeight = parseInt(
      fs.readFileSync(STORAGE_FILE_NAME, 'utf-8'),
      10,
    );
    if (savedLastEndHeight) lastEndHeight = savedLastEndHeight;
  } catch (error) {
    //
  }

  const refreshMomentlessAlerts = async () => {
    momentlessAlerts = await Alert.find({
      serialPattern: { $exists: true },
      moment: null,
    }).exec();
  };
  refreshMomentlessAlerts();

  const intervalId = setInterval(async () => {
    try {
      res = await fcl.send([fcl.getBlock(true)]).then(fcl.decode);
    } catch (err) {
      logger.error('First error', err);
      return;
    }

    const blockHeight = res.height;
    if (blockHeight === lastEndHeight) {
      return;
    }
    const startHeight = lastEndHeight
      ? Math.min(lastEndHeight + 1, blockHeight)
      : blockHeight;
    const endHeight =
      blockHeight - startHeight >= 250 ? startHeight + 245 : blockHeight;
    const prevLastEndHeight = lastEndHeight;
    lastEndHeight = endHeight;

    const evtType = 'A.c1e4f4f4c4257510.TopShotMarketV3.MomentListed';
    logger.debug(
      `Fetching ${evtType} events from block height ${startHeight} to ${endHeight}:`,
    );

    try {
      const listedEvts = await fcl
        .send([
          fcl.getEventsAtBlockHeightRange(evtType, startHeight, endHeight),
        ])
        .then(fcl.decode);

      const moments = await Promise.all(
        listedEvts.map((e) =>
          fcl
            .send([
              fcl.script(GET_LISTED_MOMENT_SCRIPT),
              fcl.args([
                fcl.arg(e.data.id, t.UInt64),
                fcl.arg(e.data.seller, t.Address),
              ]),
            ])
            .then(fcl.decode),
        ),
      );

      const momentMetas = await Promise.all(
        moments.map((m) =>
          fcl
            .send([
              fcl.script(GET_MOMENT_META_SCRIPT),
              fcl.args([
                fcl.arg(m.playId, t.UInt32),
                fcl.arg(m.setId, t.UInt32),
              ]),
            ])
            .then(fcl.decode),
        ),
      );

      const listings = new Array(listedEvts.length)
        .fill(null)
        .map((_, idx) => ({
          playerName: momentMetas[idx].playMetaData.FullName,
          playCategory: momentMetas[idx].playMetaData.PlayCategory,
          at: momentMetas[idx].playMetaData.DateOfMoment,
          setName: momentMetas[idx].setName,
          setSeriesNumber: momentMetas[idx].setSeries,
          serialNumber: moments[idx].serialNumber,
          price: Number(listedEvts[idx].data.price),
        }));
      if (listings.length) logger.debug(listings.length, 'listings');

      await Promise.all(
        listings.map(
          async ({
            playerName,
            playCategory,
            at,
            setName,
            setSeriesNumber,
            serialNumber,
            price,
          }) => {
            const moment = await Moment.findOne({
              playerName,
              playCategory,
              at,
              setName,
              setSeriesNumber,
            })
              .populate('alerts')
              .exec();

            const alerts = [];

            if (moment) alerts.push(...moment.alerts);
            if (momentlessAlerts) alerts.push(...momentlessAlerts);

            await Promise.all(
              alerts.map(async (alert) => {
                if (
                  price <= alert.budget &&
                  serialMatches(serialNumber, alert.serialPattern)
                ) {
                  const { user } = await alert.populate('user').execPopulate();

                  await notify(
                    {
                      playerName,
                      playCategory,
                      at,
                      setName,
                      setSeriesNumber,
                      serialNumber,
                      price,
                    },
                    moment,
                    alert,
                    client,
                    user,
                  );
                }
              }),
            );
          },
        ),
      );
      fs.writeFileSync(STORAGE_FILE_NAME, lastEndHeight.toString());
    } catch (err) {
      const ERRORS = {
        'invalid start or end height': `invalid start or end height: ${startHeight} -> ${endHeight}. ${lastEndHeight}, ${blockHeight}, ${prevLastEndHeight}`,
        'last sealed': `Blocks in wrong order Blocks: ${startHeight} -> ${endHeight}. ${lastEndHeight}, ${blockHeight}, ${prevLastEndHeight}`,
        'requested block range': `Wrong range requested: ${err.message}`,
        'Could not borrow': 'Could not borrow',
      };
      const [, newMessage] =
        Object.entries(ERRORS).find(([key]) => err.message.includes(key)) || [];
      if (newMessage !== undefined) {
        logger.error(newMessage);
      } else {
        logger.error('\n\n', err, '\n');
      }
    }
  }, POLL_INTERVAL_IN_MS);
  logger.info(`Started app at ${new Date()}, with interval ID ${intervalId}`);
};

start();
