const express = require('express');
const { Client } = require('pg');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello');
});

app.get('/test', (request, response) => {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: true
    });

    client.connect();

    client.query('select * from train.exercise;', (err, res) => {
        if (err) {
            throw err;
        }
        let msg = '';
        for (let row of res.rows) {
            msg += JSON.stringify(row);
        }

        client.end();

        response.send(msg);
    });
});

app.listen(process.env.PORT);

// const { Client } = require('pg');
