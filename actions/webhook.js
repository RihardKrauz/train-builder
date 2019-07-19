const PgClient = require('../services/pg-client');

function doWebhook(request, response) {
    const query = request.body;

    console.log(query);

    if (!query) {
        response.send({ result: 'Ok' });
    } else {
        response.send({ fulfillmentText: 'Test ff message' });
    }
}

module.exports = doWebhook;
