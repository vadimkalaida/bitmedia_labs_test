const DataSchemaTemplate = require('../models/data.model');
const filterData = require('../utils/filter.util');

// exports.getData = async (req, res) => {
//   try {
//     const { filterType, searchValue } = req.body;
//
//     let data = await DataSchemaTemplate.find().sort({ _id: -1 });
//     data = filterType && searchValue ? filterData(data, searchValue, filterType) : data;
//
//     res.status(200).json({ transactions: data });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error });
//   }
// };

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