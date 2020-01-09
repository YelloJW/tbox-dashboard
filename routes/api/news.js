// Dependencies
const express = require("express");
const router = express.Router();
const cheerio = require('cheerio');
const axios = require("axios");

router.post("/scrape", async (req, res) => {
  const url = req.body.url

  const news = await axios.get(url)
    .then(res => {
      const $ = cheerio.load(res.data);
      if (!$('.story-body__h1').text() == "") {
        const title = $('.story-body__h1').text();
        const img = !$('.js-image-replace').attr('src') == "" ? $('.js-image-replace').attr('src') : $('.media-placeholder').attr('src');
        const content = $('.story-body__inner > p').text();
        return {title: title, image: img, content: content}
      } else if (!$('.vxp-media__headline').text() == "") {
        const title = $('.vxp-media__headline').text();
        const img = $('.vxp-media__player > .vxp-media__placeholder-image').attr('src');
        const content = $('.vxp-media__summary > p').text();
        return {title: title, image: img, content: content}
      } else  {
        const title = $('.story-headline').text();
        const img = $('.sp-media-asset__image > img').attr('src');
        const content = $('#story-body > p').text();
        return {title: title, image: img, content: content}
      }
    })
    .catch(err => console.log(err))

  return res.json(news)
});

module.exports = router;
