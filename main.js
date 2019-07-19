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

app.get('/debug', doDebug);
app.get('/webhook', (req, res) => {
    res.send({ result: 'Ok' });
});
app.post('/webhook', doWebhook);

app.listen(process.env.PORT);
