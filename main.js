const express = require('express');
const fs = require('fs');

require.extensions['.html'] = (module, filename) => {
    module.exports = fs.readFileSync(filename, 'utf8');
};

// actions
const doDebug = require('./actions/debug');
const doWebhook = require('./actions/webhook');

const app = express();

app.get('/', (req, res) => {
    res.send('Hello');
});

app.get('/debug', doDebug);
app.post('/webhook', doWebhook);

app.listen(process.env.PORT);
