var config = {};

config.mongoURI = {
  development: `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds123490.mlab.com:23490/mikew-production`,
  test: `mongodb://${process.env.DB_USER_TEST}:${process.env.DB_PASS_TEST}@ds233061.mlab.com:33061/mikew-test`
};

module.exports = config;