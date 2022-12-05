const etherScanAPI = require('etherscan-api').init(process.env.ETHER_SCAN_API_KEY);

const getLatestBlock = async () => {
  const latestBlockNumber = await etherScanAPI.proxy.eth_blockNumber();
  const api = await etherScanAPI.proxy.eth_getBlockByNumber(latestBlockNumber.result);
  return api;
};

module.exports = getLatestBlock;