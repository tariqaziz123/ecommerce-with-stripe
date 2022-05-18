const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');

const app = express();
app.use(express.json());

// For Production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname,'client', 'build', 'index.html'));
    })
}

// Connect to Mongodb
const dbURI = config.get('dbURI');
const port = process.env.PORT || 4000;
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then((result) => app.listen(port))