const express = require("express");
const router = express.Router();
const roleModel = require("../models/roleModel");

router.post("/add-role", async (req, res) => {
  const { roleName, roleNumber } = req.body;
  const role = new roleModel({
    roleName,
    roleNumber,
  });
  await role.save();
  return res.status(200).json({ success: true });
});
module.exports = router;
