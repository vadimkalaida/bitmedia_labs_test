const controller = require('../controllers/data.controller');

module.exports = (app) => {
  app.post(
    '/api/get_data',
    controller.getData
  );
};