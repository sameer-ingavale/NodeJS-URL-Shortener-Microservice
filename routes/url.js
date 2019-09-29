const express = require("express");
const router = express.Router();
const shortid = require("shortid");
const validurl = require("valid-url");
const config = require("config");

const Url = require("../models/Url");

// @route       POST /api/url/shorten
// @desc        Create short url

// Use async await to deal with promises returned by mongoose methods
router.post("/shorten", async (req, res) => {
  // Deconstruct longUrl from request body
  const { longUrl } = req.body;

  // Get the baseUrl from default.json
  const baseUrl = config.get("baseUrl");

  // Check if the baseUrl is valid
  if (!validurl.isUri(baseUrl)) {
    return res.status(400).json("Invalid base url");
  }

  // Check if longUrl is valid
  if (validurl.isUri(longUrl)) {
    // Check if the url already exists in databse
    try {
      let url = await Url.findOne({ longUrl });

      if (url) {
        res.json({ ShortUrl: url.shortUrl });
      } else {
        const urlCode = shortid.generate();
        const shortUrl = baseUrl + "/" + urlCode;

        url = new Url({
          urlCode,
          longUrl,
          shortUrl,
          date: new Date()
        });

        await url.save();

        res.json({ ShortUrl: url.shortUrl });
      }
    } catch (error) {
      return res.status(500).json("Server error");
    }
  }
  return res.status(400).json("long url is invalid");
});

module.exports = router;
