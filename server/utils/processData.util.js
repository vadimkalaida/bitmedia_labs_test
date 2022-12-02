const web3Utils = require('web3-utils');

const processEtherScanData = (dataToProcess, previousBlockNumber = null) => {
  dataToProcess = dataToProcess.result;
  if(!dataToProcess || !dataToProcess.transactions || dataToProcess.transactions.length < 1) return;
  const arrToReturn = dataToProcess.transactions.map(item => {
    return {
      block_number: web3Utils.toNumber(item.blockNumber),
      transaction_id: item.hash,
      from: item.from,
      to: item.to,
      block_confirmations: previousBlockNumber ? web3Utils.toNumber(item.blockNumber) - previousBlockNumber : 0,
      timestamp: dataToProcess.timestamp ? new Date(web3Utils.hexToNumber(dataToProcess.timestamp) * 1000).toUTCString() : new Date().toUTCString(),
      value: web3Utils.fromWei(web3Utils.toBN(item.value)),
      gasPrice: web3Utils.hexToNumber(item.gasPrice) * 0.000000001,
      gasUsed: web3Utils.hexToNumber(dataToProcess.gasUsed),
      gas: web3Utils.hexToNumber(item.gas),
      gas_limit:  web3Utils.hexToNumber(item.gas_limit),
      v:  web3Utils.hexToNumber(item.v),
      basefeepergas: web3Utils.hexToNumber(dataToProcess.baseFeePerGas),
      maxpriority_or_max_feeper_gas: item.maxPriorityFeePerGas ? web3Utils.hexToNumber(item.maxPriorityFeePerGas) : item.maxFeePerGas ? web3Utils.hexToNumber(item.maxFeePerGas) : 0,
      transaction_fee: (((web3Utils.hexToNumber(dataToProcess.baseFeePerGas) * 0.000000001) +
        (item.maxPriorityFeePerGas ? web3Utils.hexToNumber(item.maxPriorityFeePerGas) * 0.000000001 : item.maxFeePerGas ? web3Utils.hexToNumber(item.maxFeePerGas) * 0.000000001 : 0)) * web3Utils.hexToNumber(dataToProcess.gasUsed)) * 0.000000001
      // transaction_fee: ((web3Utils.hexToNumber(item.gasPrice) * 0.000000001) * web3Utils.hexToNumber(dataToProcess.gasUsed)) * 0.000000001
      // transaction_fee: web3Utils.fromWei((web3Utils.hexToNumber(dataToProcess.gasUsed) * (web3Utils.hexToNumber(dataToProcess.baseFeePerGas)
      //   + (item.maxPriorityFeePerGas ? web3Utils.hexToNumber(item.maxPriorityFeePerGas) : item.maxFeePerGas ? web3Utils.hexToNumber(item.maxFeePerGas) : 0))).toString())
    };
  });

  return arrToReturn.slice(0, 16);
};

module.exports = processEtherScanData;