const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello');
});

app.listen(3000);

// const { Client } = require('pg');

// const client = new Client({
//     connectionString: process.env.DATABASE_URL,
//     ssl: true
// });

// client.connect();

// client.query('select * from train.exercise;', (err, res) => {
//     if (err) {
//         throw err;
//     }

//     for (let row of res.rows) {
//         console.log(JSON.stringify(row));
//     }

//     client.end();
// });
