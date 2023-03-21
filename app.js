const express = require('express');
const app = express();
// const Sequelize = require('sequelize');

// to user routes 
const teacherRouter = require('./routes/teacher_router');
const levelRouter = require('./routes/level_router');
const studentRouter = require('./routes/student_router');

// middlewares  
app.use(express.json());
app.use('/api', teacherRouter);
app.use('/api', levelRouter);
app.use('/api', studentRouter);

// PORT
const PORT = process.env.PORT || 5000;


//** */ To connecto with database and run the  server locally **//
// const connection = new Sequelize('postgres://api-college-app-main-db-0697db994aab86e91:PzvQsTqDvJScJuagu229H6kFmGjNs6@user-prod-us-east-2-1.cluster-cfi5vnucvv3w.us-east-2.rds.amazonaws.com:5432/api-college-app-main-db-0697db994aab86e91');
// connection.authenticate()
//     .then(() => {
//         console.log('Nice! Database synced...');
//         app.listen(PORT, () => {
//             console.log(`Server running on http://localhost:${PORT}/api`);
//         });
//     })
//     .catch((error) => { console.error('Error connecting' + error); });
// ** Online server ** //
app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});
