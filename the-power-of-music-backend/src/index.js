require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const session = require('express-session');
const {jwtMiddleware} = require('lib/token');

const {
    PORT: port = 4000,
    MONGO_URI: mongoURI,
    SESSION_SECRET: sessionSecret
} = process.env;

const app = express();
const api = require('./api');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true
}));

app.use(jwtMiddleware);

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(mongoURI).then(() => {
    console.log('mongodb connected');
}).catch((e) => {
    console.error(e);
});




app.use('/uploads', express.static(path.join(__dirname, './uploads')));
app.use('/api', api);
app.use(express.static(path.join(__dirname, '../../the-power-of-music-frontend/build')));
app.get('*', function(req,res){
    res.sendFile(path.join(__dirname, '../../the-power-of-music-frontend/build/index.html'));
  });



app.listen(port, () => {
    console.log("app is running on port", port);
});