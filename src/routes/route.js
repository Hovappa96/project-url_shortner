const express = require("express")
const router = express.Router();
const shortenController = require("../controllers/shortenController")



router.post("/url/shorten",shortenController.createShortenUrl)

router.get("/:urlCode", shortenController.getUrlContent)

module.exports = router;