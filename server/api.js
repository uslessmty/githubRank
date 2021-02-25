//服务端发起请求的工具包
var rp = require('request-promise');
//cheerio是jquery核心功能的一个快速灵活而又简洁的实现，主要是为了用在服务器端需要对DOM进行操作的地方
var cheerio = require('cheerio');
const express = require('express');
const router = express.Router();
//{"titles":["freeCodeCamp/freeCodeCamp","vuejs/vue","facebook/react","twbs/bootstrap","airbnb/javascript","trekhleb/javascript-algorithms","axios/axios","nodejs/node","30-seconds/30-seconds-of-code","mrdoob/three.js"],"descs":[],"stars":[],"updateDate":[],"links":["https://github.com/freeCodeCamp/freeCodeCamp","https://github.com/vuejs/vue","https://github.com/facebook/react","https://github.com/twbs/bootstrap","https://github.com/airbnb/javascript","https://github.com/trekhleb/javascript-algorithms","https://github.com/axios/axios","https://github.com/nodejs/node","https://github.com/30-seconds/30-seconds-of-code","https://github.com/mrdoob/three.js"]}
router.get('/github-ranking/:lang/:sorts', (req, res) => {
  let language = req.params.lang;
  let sort = req.params.sorts;
  let infos = {
    titles: [],
    descs: [],
    stars: [],
    updateDate: [],
    links: []
  };
  let url = `https://github.com/search?l=${language.replace('#', '%23')}&o=desc&q=${language.replace('#', '%23')}&s=${sort}&type=Repositories&utf8=%E2%9C%93`;
  let options = {
    url,
    transform(body) {
      return cheerio.load(body);
    }
  }
  let p = new Promise((resolve, reject) => {
    rp(options)
      .then($ => {
        let $titles = $('a.v-align-middle');
        let $descs = $('.col-9.d-inline-block.text-gray.mb-2.pr-4');
        let $stars = $('div.col-2 a');
        let $updateDate = $('p.f6.text-gray.mb-0.mt-2');

        $titles.each((index, item) => {
          infos.titles.push($(item).text().replace(/\s/g, ''));
          infos.links.push('https://github.com'+$(item).attr('href'));
        });
        $descs.each((index, item) => {
          infos.descs.push($(item).text().trim());
        });
        $stars.each((index, item) => {
          infos.stars.push($(item).text().replace(/[\s\n]/g, ''));
        });
        $updateDate.each((index, item) => {
          infos.updateDate.push($(item).text().trim());
        });
        resolve(infos);
      })
    });
    p.then((infos) => {
      res.json(infos)
    });
});
module.exports = router;