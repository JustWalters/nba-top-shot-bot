const AdminBro = require('admin-bro');
const { buildRouter } = require('@admin-bro/koa');
const AdminBroMongoose = require('@admin-bro/mongoose');

const User = require('../models/User');
const Alert = require('../models/Alert');
const Moment = require('../models/Moment');

const useAdminPanel = (server) => {
  AdminBro.registerAdapter(AdminBroMongoose);

  const adminBro = new AdminBro({
    resources: [User, Alert, Moment],
    rootPath: '/admin',
  });

  const adminRouter = buildRouter(adminBro, server);

  server.use(adminRouter.routes()).use(adminRouter.allowedMethods());
};

module.exports = useAdminPanel;
