//Install express server
const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('./dist/data-visualization'));

app.get('/*', function(req,res) {
res.sendFile(path.join(__dirname,'/dist/data-visualization/index.html'));
});

app.listen(process.env.PORT || 8080);
