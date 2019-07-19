const debugLayout = require('../layouts/debug.html');
const PgClient = require('../services/pg-client');

function doDebug(request, response) {
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
}

module.exports = doDebug;
