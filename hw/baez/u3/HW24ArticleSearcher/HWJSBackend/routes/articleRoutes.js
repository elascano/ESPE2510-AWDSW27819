const express = require("express");
const router = express.Router();
const controller = require("../controllers/articleController");

router.get("/", controller.searchArticles);

module.exports = router;
