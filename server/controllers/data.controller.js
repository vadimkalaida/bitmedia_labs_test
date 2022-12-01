const DataSchemaTemplate = require('../models/data.model');

exports.getData = async (req, res) => {
  try {
    // const data1 = new DataSchemaTemplate({ block_number: 12057206, transaction_id: '0x0f9aa15ef3f458754d',
    //   from: '0x9A2C601f2536574', to: '0x12D819E30db2E4325ge34',
    //   block_confirmations: '54', timestamp: new Date(), value: 0.011354999999999923,
    //   transaction_fee: 0.007643586
    // });
    //
    // await data1.save();

    const data = await DataSchemaTemplate.find();

    res.status(200).json({ data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
};