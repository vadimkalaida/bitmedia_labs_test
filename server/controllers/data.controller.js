const DataSchemaTemplate = require('../models/data.model');
const processDataPagination = require('../utils/processPaginationData.util');

exports.getData = async (req, res) => {
  try {
    const { filterType, searchValue } = req.body;
    const pageSize = !req.body.pageSize ? 14 : req.body.pageSize;
    const currentPage = !req.body.currentPage ? 1 : req.body.currentPage;

    let mongoData = await DataSchemaTemplate.find({
      [filterType]: {
        $regex: new RegExp('^' + searchValue, 'i')
      }
    });

    let data = processDataPagination(mongoData, pageSize, currentPage);

    res.status(200).json({ transactions: data.data, paginationRange: data.range, pagesNumber: Math.ceil(mongoData.length / pageSize) });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
};