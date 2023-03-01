const express = require('express');
const app = express();
const Sequelize = require('sequelize');
const config = require('./config/config.json');

// to user routes 
const teacherRouter = require('./routes/teacher_router');
const levelRouter = require('./routes/level_router');

// middlewares  
app.use(express.json());
app.use('/api', teacherRouter);
app.use('/api', levelRouter)

// port
const PORT = process.env.PORT || 5000;

//** */ To connecto with database and run the  server **//
// All required for connection to database
const databaseName = config.development.database;
const userName = config.development.username;
const userPassword = config.development.password;
const dialect = config.development.dialect;
const connection = new Sequelize(databaseName, userName,
    userPassword, { dialect: dialect });
connection.authenticate()
    .then(() => {
        console.log('Nice! Database synced...');
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}/api`);
        });
    })
    .catch((error) => { console.error('Error connecting' + error); });


