const url = require('url');
const axios = require('axios').default;
const cheerio = require('cheerio');

const User = require('../models/User');
const Moment = require('../models/Moment');
const Alert = require('../models/Alert');

class Service {
  static async getMomentData(urlInput) {
    const listingUrl = url.format(new URL(urlInput), {
      auth: false,
      fragment: false,
      search: false,
    });
    const res = await axios.get(listingUrl);
    const $ = cheerio.load(res.data);
    const momentData = JSON.parse($('#__NEXT_DATA__').html()).props.pageProps
      .moment;
    const { playerName, playCategory, dateOfMoment } = momentData.play.stats;
    const { flowName, flowSeriesNumber } = momentData.set;

    const moment = {
      url: listingUrl,
      playerName,
      playCategory,
      at: dateOfMoment,
      setName: flowName,
      setSeriesNumber: flowSeriesNumber,
    };

    return moment;
  }

  static async createAlert(alertData) {
    const alert = await Alert.create(alertData);

    if (alertData.moment) {
      await Moment.findByIdAndUpdate(alertData.moment, {
        $push: {
          alerts: alert._id,
        },
      }).exec();
    }

    await User.findByIdAndUpdate(alertData.user, {
      $push: {
        watchedAlerts: alert._id,
      },
    }).exec();

    return alert;
  }
}

module.exports = Service;
