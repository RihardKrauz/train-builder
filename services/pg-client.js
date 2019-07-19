const { Client } = require('pg');

class PgClient {

    runQueryAsync = (reqString) => new Promise((resolved, rejected) => {
            const client = new Client({
                connectionString: process.env.DATABASE_URL,
                ssl: true
            });

            try {
                client.connect();
            
                client.query(reqString, (err, res) => {
                    if (err) {
                        rejected(err);
                    }
            
                    resolved(res);
            
                    client.end();
                });
            } catch (ex) {
                try {
                    client.end();
                } catch() {}
                rejected(ex);
            }
        };
    
};

module.exports = PgClient;

