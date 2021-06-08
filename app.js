const express = require('express');
const mongoose = require('mongoose')
const UserRoute = require('./routes/user');
const app = express();
const MONGODB_URI =
'mongodb://riya:riyaMishra@riya-shard-00-00.x3txw.mongodb.net:27017,riya-shard-00-01.x3txw.mongodb.net:27017,riya-shard-00-02.x3txw.mongodb.net:27017/Webcoir?ssl=true&replicaSet=atlas-tlayox-shard-0&authSource=admin&retryWrites=true&w=majority';

app.use(express.json())

app.use('/api', UserRoute);

mongoose
  .connect(MONGODB_URI, { useUnifiedTopology: true })
  .then(result => {
        app.listen(3050);
  })
  .catch(err => {
    console.log(err);
  });

module.exports= app;