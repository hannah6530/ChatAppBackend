const express = require('express');
const bodyParser = require('body-parser');
const users = require('./routes/users');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/users', users);

app.use((err, req, res, next) => {
    res.json(err);
});


module.exports = app;