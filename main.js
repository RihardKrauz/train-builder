const express = require('express');
const { Client } = require('pg');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello');
});

app.get('/test', (request, response) => {
    try {
        const client = new Client({
            connectionString: process.env.DATABASE_URL,
            ssl: true
        });

        client.connect();

        client.query("SET client_encoding to 'UTF8';", function(err_res, empty_result_to_fix_encoding) {
            client.query('select * from train.exercise;', (err, res) => {
                if (err || err_res) {
                    throw err;
                }
                let msg = '';

                console.log(res);

                if (res.rows) {
                    for (let row of res.rows) {
                        msg += JSON.stringify(row);
                    }
                }

                client.end();
                const html = `
                        <!DOCTYPE html>
                        <html lang="en">
                        <head>
                            <meta charset="utf-8" />
                            <meta
                            name="viewport"
                            content="width=device-width, initial-scale=1, shrink-to-fit=no"
                            />
                            <meta name="theme-color" content="#000000" />

                            <title>New app</title>
                        </head>
                        <body>
                            <noscript>You need to enable JavaScript to run this app.</noscript>
                            <div id="root">${msg}</div>
                        </body>
                        </html>
                `;
                response.send(html);
            });
        });
    } catch (ex) {
        response.send(ex);
    }
});

app.listen(process.env.PORT);
