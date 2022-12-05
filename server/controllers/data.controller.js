const DataSchemaTemplate = require('../models/data.model');
const processDataPagination = require('../utils/processPaginationData.util');

exports.getData = async (req, res) => {
  try {
    const { filterType, searchValue } = req.body;
    const pageSize = !req.body.pageSize ? 14 : req.body.pageSize;
    const currentPage = (!req.body.currentPage ? 1 : req.body.currentPage) - 1;


    let paginationRange = {
      startNum: currentPage - 4 > -1 ? currentPage - 4 : 0,
      endNum: currentPage - 4 > -1 ? currentPage + 5 : 9
    };

    let mongoData;
    let dataLength;

    if(searchValue.length < 1) {
      dataLength = await DataSchemaTemplate.count();
      mongoData = await DataSchemaTemplate.find({
        ['transaction_number']: { $lte:dataLength - (paginationRange.startNum * pageSize), $gte: dataLength - (paginationRange.endNum * pageSize) }
      }).sort({ _id: -1 });
    } else {
      mongoData = await DataSchemaTemplate.find({
        [filterType]: {
          $regex: new RegExp('^' + searchValue, 'i')
        }
      }).sort({ _id: -1 });
      dataLength = mongoData.length;
    }

    let data = processDataPagination(mongoData, pageSize, paginationRange, searchValue.length > 0);

    res.status(200).json({ transactions: data.data, paginationRange, pagesNumber: Math.ceil(dataLength / pageSize) });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
};