const express = require("express");
const { getAllCompany } = require("../controllers/companyController");
const router = express.Router();

router.get("/company", getAllCompany);

module.exports = router;
