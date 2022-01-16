const AdminBro = require('admin-bro');
const { buildRouter } = require('@admin-bro/koa');
const AdminBroMongoose = require('@admin-bro/mongoose');

const User = require('../models/User');
const Alert = require('../models/Alert');
const Moment = require('../models/Moment');

const Service = require('./service');

const MomentViewer = AdminBro.bundle('./admin-components/MomentViewer');
const AddMomentAndAlert = AdminBro.bundle(
  './admin-components/AddMomentAndAlert',
);

const useAdminPanel = (server) => {
  AdminBro.registerAdapter(AdminBroMongoose);

  const adminBro = new AdminBro({
    resources: [
      User,
      {
        resource: Alert,
        options: {
          editProperties: ['user', 'moment', 'budget', 'serialPattern'],
          properties: {
            moment: {
              components: {
                show: MomentViewer,
              },
            },
          },
          actions: {
            addMomentAndAlert: {
              actionType: 'resource',
              component: AddMomentAndAlert,
              handler: async (request) => {
                try {
                  const params = JSON.parse(request.query.record);
                  let momentId;

                  if (params.moment) {
                    const momentData = await Service.getMomentData(
                      params.moment,
                    );
                    const existedMoment = await Moment.findOne(
                      momentData,
                    ).exec();
                    if (existedMoment) {
                      const error = new Error('Moment already exists');
                      error.data = { moment: existedMoment };
                      throw error;
                    }

                    const moment = await Moment.create(momentData);
                    momentId = moment._id.toString();
                  }

                  const alert = await Service.createAlert({
                    user: params.user,
                    moment: momentId,
                    budget: params.budget,
                    serialPattern: params.serialPattern,
                    importance: params.importance,
                  });

                  return {
                    record: {
                      id: alert._id.toString(),
                      params: alert,
                      errors: {},
                    },
                  };
                } catch (err) {
                  // TODO: Handle error for real
                  console.warn(err, err.data);
                  return {
                    record: {
                      errors: {},
                    },
                  };
                }
              },
            },
          },
        },
      },
      {
        resource: Moment,
        options: {
          properties: {
            description: {
              isTitle: true,
            },
          },
        },
      },
    ],
    rootPath: '/admin',
  });

  const adminRouter = buildRouter(adminBro, server);

  server.use(adminRouter.routes()).use(adminRouter.allowedMethods());
};

module.exports = useAdminPanel;
