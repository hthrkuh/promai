const express = require("express");
const router = express.Router();

const crmRoutes = require("./crmRoutes");
const paymentRoutes = require("./paymentRoutes");
const giphyRoutes = require("./giphyRoutes");

router.use("/crm", crmRoutes);
router.use("/payment", paymentRoutes);
router.use("/giphy", giphyRoutes);

module.exports = router;
