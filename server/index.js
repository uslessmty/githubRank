const express = require('express');
const api = require('./api'); 
const app = express();
app.use(express.static('public'))
app.use(api);

app.listen(8088);
//Access to XMLHttpRequest at 'http://localhost:8088/github-ranking/JavaScript/stars' \
//from origin 'http://localhost:8080' has been blocked by CORS policy: 
//No 'Access-Control-Allow-Origin' header is present on the requested resource.