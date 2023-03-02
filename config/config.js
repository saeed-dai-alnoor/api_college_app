module.exports = {
  development: {
    // url: 'postgres://saeed_dev:SbXS0TDJgsbt6X2so7MDer4L2gtOZ5Or@dpg-cg034a9mbg5ek4mqvdgg-a.oregon-postgres.render.com/api_college_app',
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