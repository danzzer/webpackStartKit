module.exports = require(__dirname + '/config/webpack/' + (process.env.NODE_ENV == "production" ? "production" : "development"));

