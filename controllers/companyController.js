const companyModel = require("../models/companyModel");

exports.getAllCompany = async (req, res) => {
  const company = await companyModel.find();
  return res.status(200).json({ company });
};
