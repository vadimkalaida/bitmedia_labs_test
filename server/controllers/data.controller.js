const DataSchemaTemplate = require('../models/data.model');
const axios = require('axios');
const processEtherScanData = require('../utils/processData.util');
const etherScanAPI = require('etherscan-api').init('Y63RZWY7UHPA61P3AWNNCD3N6UDVZ4R4AX');

exports.getData = async (req, res) => {
  try {
    // const data1 = new DataSchemaTemplate({ block_number: 12057206, transaction_id: '0x0f9aa15ef3f458754d',
    //   from: '0x9A2C601f2536574', to: '0x12D819E30db2E4325ge34',
    //   block_confirmations: '54', timestamp: new Date(), value: 0.011354999999999923,
    //   transaction_fee: 0.007643586
    // });
    //
    // await data1.save();
    const etherScanResponse = await axios.get(`https://api.etherscan.io/api?module=proxy&action=eth_getBlockByNumber&boolean=true&apikey${ process.env.etherScanAPIKey }`);

    const latestBlockNumber = await etherScanAPI.proxy.eth_blockNumber();

    console.log(latestBlockNumber);

    const api = await etherScanAPI.proxy.eth_getBlockByNumber(latestBlockNumber.result);
    
    if(etherScanResponse.status !== 200) {
      res.status(etherScanResponse.status).json({error: etherScanResponse.statusText});
      return;
    }

    const data = etherScanResponse && etherScanResponse.data ? processEtherScanData(etherScanResponse.data) : [];

    res.status(200).json({ processed: data, data: etherScanResponse.data, api });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
};