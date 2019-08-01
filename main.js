const express = require('express');
const fs = require('fs');

require.extensions['.html'] = (module, filename) => {
    module.exports = fs.readFileSync(filename, 'utf8');
};

// actions
const doDebug = require('./actions/debug');
const doWebhook = require('./actions/webhook');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello');
});

app.post('/ml', (req, res) => {
    console.log(req.body);
    res.send('ml');
});

app.get('/debug', doDebug);
app.get('/webhook', (req, res) => res.sendStatus(200));
app.post('/webhook', doWebhook);

app.listen(process.env.PORT);
