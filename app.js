const express = require('express');
const bodyParser = require('body-parser');
const users = require('./routes/users');

const app = express();

app.use(bodyParser.json());
app.use('/users', users);

app.use((err, req, res, next) => {
    res.json(err);
});


module.exports = app;