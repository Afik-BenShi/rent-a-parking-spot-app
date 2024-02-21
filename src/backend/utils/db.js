const { Spanner } = require('@google-cloud/spanner');
let spanner, instance, database

const init = () => {
    const projectId = 'careful-result-414608';
    const instanceId = 'rental-wize';
    const databaseId = 'rental-wizeDB';

    // Creates a client
    spanner = new Spanner({
        projectId: projectId,
    });

    // Gets a reference to a Cloud Spanner instance and database
    instance = spanner.instance(instanceId);
    database = instance.database(databaseId);
}


const runQuery = async (statment) => {
    const query = { sql: statment };

    const [rows] = await database.run(query);
    const result = rows.map(row => row.toJSON());

    return result;
}

const closeConnection = async () => {
    await database.close();
}

module.exports = { init, closeConnection, runQuery }