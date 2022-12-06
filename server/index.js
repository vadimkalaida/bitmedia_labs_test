require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const getEtherscan = require('./utils/getEtherscanData.util');
const path = require('path');

app.use(cors(
  {
    origin: [
      "http://localhost:3000"
    ],
    methods: ['GET', 'POST'],
    credentials: true,
  }
));

// app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require('./routes')(app);

// Get EtherScanData
// getEtherscan();

const port = process.env.PORT || 8080;

// if(process.env.NODE_ENV=== 'production') {
//   app.use(express.static(path.join(__dirname, '/build')));
//   app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '/build', 'index.html'));
//   })
// }

mongoose
  .connect(process.env.MONGO_URI, () => {
    app.listen(port, function() {
      console.log('Listening on PORT ' + port);
    });
  })
  .then(() => console.log('MongoDB successfully connected'))
  .catch(err => console.error(err));