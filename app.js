const express = require('express');
const app = express();
const Sequelize = require('sequelize');
// const config = require('./config/config.json');

// to user routes 
const teacherRouter = require('./routes/teacher_router');
const levelRouter = require('./routes/level_router');

// middlewares  
app.use(express.json());
app.use('/api', teacherRouter);
app.use('/api', levelRouter)

// port
const port = process.env.PORT || 5000;
const connection = new Sequelize('postgres://api-college-app-main-db-0697db994aab86e91:PzvQsTqDvJScJuagu229H6kFmGjNs6@user-prod-us-east-2-1.cluster-cfi5vnucvv3w.us-east-2.rds.amazonaws.com:5432/api-college-app-main-db-0697db994aab86e91')

//** */ To connecto with database and run the  server **//
// All required for connection to database
// const databaseName = config.development.database;
// const userName = config.development.username;
// const userPassword = config.development.password;
// const dialect = config.development.dialect;
// const connection = new Sequelize(databaseName, userName,
//     userPassword, { dialect: dialect });

connection.authenticate()
    .then(() => {
        console.log('Nice! Database synced...');
        app.listen(port, () => {
            console.log(`Server running on http://localhost:${port}/api`);
        });
    })
    .catch((error) => { console.error('Error connecting' + error); });

// app.listen(port, () => {
//     console.log(`App listening at http://localhost:${port}`);
// });
