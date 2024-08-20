const express = require("express");
const router = express.Router();
const { isManger } = require("../helpers/authMiddleware");

const crmRoutes = require("./crmRoutes");
const paymentRoutes = require("./paymentRoutes");
const giphyRoutes = require("./giphyRoutes");

router.use("/crm", isManger, crmRoutes);
router.use("/payment", paymentRoutes);
router.use("/giphy", giphyRoutes);

module.exports = router;
