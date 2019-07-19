const express = require('express');
const fs = require('fs');

require.extensions['.html'] = (module, filename) => {
    module.exports = fs.readFileSync(filename, 'utf8');
};

// actions
const doDebug = require('./actions/debug');

const app = express();

app.get('/', (req, res) => {
    res.send('Hello');
});

app.get('/debug', doDebug);

app.listen(process.env.PORT);
