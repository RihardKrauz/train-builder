const express = require('express');
const app = express();

const PgClient = require('./services/pg-client');
const debugLayout = require('./layouts/debug.html');

app.get('/', (req, res) => {
    res.send('Hello');
});

app.get('/test2', (request, response) => {
    try {
        const pgClient = new PgClient();
        pgClient
            .runQueryAsync('select * from train.exercise;')
            .then(res => {
                let msg = '';
                if (res.rows) {
                    for (let row of res.rows) {
                        msg += JSON.stringify(row);
                    }
                }

                const html = debugLayout.split('{msg}').join(msg);
                response.send(html);
            })
            .catch(errP => {
                response.send(errP);
            });
    } catch (ex) {
        response.send(ex);
    }
});

app.listen(process.env.PORT);
