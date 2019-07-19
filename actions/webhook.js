const PgClient = require('../services/pg-client');

const AGENT_ACTIONS = {
    addNewExercise: 'AddNewExercise'
};

async function addExercise({ ExerciseName, ExerciseDescription }) {
    const pgClient = new PgClient();
    const res = await pgClient.runQueryAsync(
        `insert into train.exercise (name, description) values (${ExerciseName}, ${ExerciseDescription});`
    );
    console.log(res);
}

function doWebhook(request, response) {
    try {
        const body = request.body;
        console.log(JSON.stringify(body));

        if (body) {
            switch (body.queryResult.action) {
                case AGENT_ACTIONS.addNewExercise:
                    addExercise(body.queryResult.parameters);
                    break;
                default:
                    console.log('Unknown action');
            }
        }

        response.send({ result: 'Ok' });
    } catch (ex) {
        console.error(ex);
        response.send({ result: 'Error' });
    }
}

module.exports = doWebhook;
