module.exports = {
  development: {
    url: 'postgres://api-college-app-main-db-0697db994aab86e91:PzvQsTqDvJScJuagu229H6kFmGjNs6@user-prod-us-east-2-1.cluster-cfi5vnucvv3w.us-east-2.rds.amazonaws.com:5432/api-college-app-main-db-0697db994aab86e91',
    dialect: 'postgres',
  },
  test: {
    url: '127.0.0.1',
    dialect: 'postgres',

  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
  }
};