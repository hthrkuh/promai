const express = require("express");
const { getCRMData } = require("../controllers/crmController");

const router = express.Router();

router.get("/data", getCRMData);

module.exports = router;
