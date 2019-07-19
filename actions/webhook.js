const PgClient = require('../services/pg-client');

const AGENT_ACTIONS = {
    addNewExercise: 'AddNewExercise',
    showAllExercises: 'ShowAllExercises'
};

async function addExercise({ ExerciseName, ExerciseDescription }) {
    const pgClient = new PgClient();
    const res = await pgClient.runQueryAsync(
        `insert into train.exercise (name, description) values ('${ExerciseName}', '${ExerciseDescription}');`
    );
    console.log(res);
}

async function getExercises() {
    const pgClient = new PgClient();
    const res = await pgClient.runQueryAsync(`select name, description from train.exercise;`);

    return res.rows;
}

async function doWebhook(request, response) {
    try {
        const body = request.body;
        console.log(JSON.stringify(body));

        if (body) {
            switch (body.queryResult.action) {
                case AGENT_ACTIONS.addNewExercise:
                    addExercise(body.queryResult.parameters);
                    break;
                case AGENT_ACTIONS.showAllExercises:
                    var exercises = await getExercises();
                    if (!exercises) {
                        throw 'Cant get any exercises';
                    } else {
                        response.json({ fulfillmentText: exercises.map(e => e.name + '=' + e.description).join(', ') });
                    }
                    return;
                default:
                    console.log('Unknown action');
            }
        }

        response.sendStatus(200);
    } catch (ex) {
        console.error(ex);
        response.sendStatus(500);
    }
}

module.exports = doWebhook;
