const web3Utils = require('web3-utils');
const etherScanAPI = require('etherscan-api').init(process.env.etherScanAPIKey);

const processItem = async(item, dataToProcess, previousBlockNumber) => {
  try {
    const transactionReceipt = await etherScanAPI.proxy.eth_getTransactionReceipt(item.hash);

    return {
      block_number: web3Utils.toNumber(item.blockNumber),
      transaction_id: item.hash,
      from: item.from,
      to: item.to,
      block_confirmations: previousBlockNumber ? web3Utils.toNumber(item.blockNumber) - previousBlockNumber : 0,
      timestamp: dataToProcess.timestamp ? new Date(web3Utils.hexToNumber(dataToProcess.timestamp) * 1000) : new Date(),
      value: Number(web3Utils.fromWei(web3Utils.toBN(item.value))),
      transaction_fee: Number(web3Utils.fromWei(((web3Utils.hexToNumber(dataToProcess.baseFeePerGas) +
        (item.maxPriorityFeePerGas ? web3Utils.hexToNumber(item.maxPriorityFeePerGas) : item.maxFeePerGas ? web3Utils.hexToNumber(item.maxFeePerGas) : 0)) * web3Utils.hexToNumber(transactionReceipt.result.gasUsed)).toString()))
    };
  } catch (err) {
    console.log(err);
    return {};
  }
};

const processEtherScanData = async (dataToProcess, previousBlockNumber = null) => {
  try {
    dataToProcess = dataToProcess.result;
    if(!dataToProcess || !dataToProcess.transactions || dataToProcess.transactions.length < 1) return;

    const arrToReturn = [];
    let item;

    for(let i = 0; i < dataToProcess.transactions.length; i++) {
      item = await processItem(dataToProcess.transactions[i], dataToProcess, previousBlockNumber);
      arrToReturn.push(item);
    }

    return arrToReturn;
  } catch (e) {
    console.error(e);
  }
};

module.exports = processEtherScanData;