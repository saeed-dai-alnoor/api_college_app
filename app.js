const express = require('express');
const app = express();
const Sequelize = require('sequelize');
const config = require('./config/config.json');
// for server database
const AWS = require("aws-sdk");
const s3 = new AWS.S3()
const bodyParser = require('body-parser');

// to user routes 
const teacherRouter = require('./routes/teacher_router');
const levelRouter = require('./routes/level_router');

// middlewares  
app.use(bodyParser.json())
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
// curl -i https://some-app.cyclic.app/myFile.txt
app.get('*', async (req, res) => {
    let filename = req.path.slice(1)

    try {
        let s3File = await s3.getObject({
            Bucket: process.env.BUCKET,
            Key: filename,
        }).promise()

        res.set('Content-type', s3File.ContentType)
        res.send(s3File.Body.toString()).end()
    } catch (error) {
        if (error.code === 'NoSuchKey') {
            console.log(`No such key ${filename}`)
            res.sendStatus(404).end()
        } else {
            console.log(error)
            res.sendStatus(500).end()
        }
    }
});

// curl -i -XPUT --data '{"k1":"value 1", "k2": "value 2"}' -H 'Content-type: application/json' https://some-app.cyclic.app/myFile.txt
app.put('*', async (req, res) => {
    let filename = req.path.slice(1)

    console.log(typeof req.body)

    await s3.putObject({
        Body: JSON.stringify(req.body),
        Bucket: process.env.BUCKET,
        Key: filename,
    }).promise()

    res.set('Content-type', 'text/plain')
    res.send('ok').end()
})

// curl -i -XDELETE https://some-app.cyclic.app/myFile.txt
app.delete('*', async (req, res) => {
    let filename = req.path.slice(1)

    await s3.deleteObject({
        Bucket: process.env.BUCKET,
        Key: filename,
    }).promise()

    res.set('Content-type', 'text/plain')
    res.send('ok').end()
})

// /////////////////////////////////////////////////////////////////////////////
// Catch all handler for all other request.
app.use('*', (req, res) => {
    res.sendStatus(404).end()
})


connection.authenticate()
    .then(() => {
        console.log('Nice! Database synced...');
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}/api`);
        });
    })
    .catch((error) => { console.error('Error connecting' + error); });


