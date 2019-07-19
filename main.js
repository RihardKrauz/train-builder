// js imports
const express = require('express');
const PgClient = require('./services/pg-client');
const fs = require('fs');

require.extensions['.html'] = (module, filename) => {
    module.exports = fs.readFileSync(filename, 'utf8');
};

// html imports
const debugLayout = require('./layouts/debug.html');

// main
const app = express();

app.get('/', (req, res) => {
    res.send('Hello');
});

app.get('/debug', (request, response) => {
    const query = request.query.queryData;

    if (!query) {
        const html = debugLayout.split('{msg}').join('Query is empty');
        response.send(html);
    } else {
        const pgClient = new PgClient();
        pgClient
            .runQueryAsync(query)
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
    }
});

app.listen(process.env.PORT);
