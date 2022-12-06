const DataSchemaTemplate = require('../models/data.model');
const getLatestBlock = require('./getLatestBlock.util');
const processEtherScanData = require('./processData.util');

function debounceFunc (callback, delay) {
  let isDoneBool = true;
  let myInterval;

  return () => {
    myInterval = setInterval(() => {
      if(isDoneBool) {
        callback(() => isDoneBool = true);
        isDoneBool = false;
      }
    }, delay);
  }
}

const getEtherscan = debounceFunc(async (setDoneFunc) => {
  try {
    const lastItemOfDB = await DataSchemaTemplate.find().sort({ _id: -1 }).limit(2);
    const api = await getLatestBlock();
    const lastEtherScanData = api ? (lastItemOfDB && lastItemOfDB.length > 0 ?
        await processEtherScanData(api, lastItemOfDB[0].block_number ? lastItemOfDB[0].block_number : null,
          lastItemOfDB[0].transaction_number !== undefined ? lastItemOfDB[0].transaction_number : lastItemOfDB[1].transaction_number !== undefined ? lastItemOfDB[1].transaction_number : null) :
        await processEtherScanData(api, null, null)
      )
      : [];
    await DataSchemaTemplate.insertMany(lastEtherScanData);
    setDoneFunc();
  } catch (e) {
    console.error(e);
    setDoneFunc();
  }
}, 1000);

module.exports = getEtherscan;