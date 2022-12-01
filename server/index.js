require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

app.use(cors(
  {
    origin: [
      "http://localhost:3000"
    ],
    methods: ['GET', 'POST'],
    credentials: true,
  }
));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require('./routes')(app);

mongoose
  .connect(process.env.mongoURI, () => {
    app.listen(8080, function() {
      console.log('Listening on PORT ' + 8080);
    });
  })
  .then(() => console.log('MongoDB successfully connected'))
  .catch(err => console.error(err));