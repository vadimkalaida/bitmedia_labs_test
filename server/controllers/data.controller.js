const DataSchemaTemplate = require('../models/data.model');
const axios = require('axios');
const processEtherScanData = require('../utils/processData.util');
const getLatestBlock = require('../utils/getLatestBlock.util');
const filterData = require('../utils/filter.util');

function debounceFunc (callback, delay) {
  let isDoneBool = true;
  let myInterval;

  return () => {
    myInterval = setInterval(() => {
      if(isDoneBool) {
        callback(() => isDoneBool = true);
        isDoneBool = false;
        console.log('sent');
      } else {
        console.log('not sent');
      }
    }, delay);
  }
}

const getEtherscan = debounceFunc(async (setDoneFunc) => {
  try {
    const lastItemOfDB = await DataSchemaTemplate.find().sort({ _id: -1 }).limit(1);
    const api = await getLatestBlock();
    const lastEtherScanData = api ? await processEtherScanData(api, lastItemOfDB && lastItemOfDB.length > 0 && lastItemOfDB[0].block_number ? lastItemOfDB[0].block_number : null) : [];
    await DataSchemaTemplate.insertMany(lastEtherScanData);
    setDoneFunc();
  } catch (e) {
    console.error(e);
    setDoneFunc();
  }
}, 1000);

// getEtherscan();

exports.getData = async (req, res) => {
  try {
    const { filterType, searchValue } = req.body;

    let data = await DataSchemaTemplate.find().sort({ _id: -1 });
    data = filterType && searchValue ? filterData(data, searchValue, filterType) : data;

    res.status(200).json({ transactions: data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
};