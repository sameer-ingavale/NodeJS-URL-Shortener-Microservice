const express = require("express");
const router = express.Router();

const Url = require("../models/Url");

// @route       GET /:code
// @desc        Redirect to the long url

router.get("/:code", async (req, res) => {
  try {
    let url = await Url.findOne({ urlCode: req.params.code });

    if (url) {
      res.redirect(url.longUrl);
    } else {
      return res.status(404).json("Page Not Found");
    }
  } catch (error) {
    return res.status(500).json("Server error");
  }
});

module.exports = router;
