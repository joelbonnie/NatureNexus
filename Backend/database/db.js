const oracledb = require('oracledb');
oracledb.autoCommit = true;

const dbConfig = {
    user: process.env.ORACLE_USER,
    password: process.env.ORACLE_PASS,
    connectString: `${process.env.ORACLE_HOST}:${process.env.ORACLE_PORT}/${process.env.ORACLE_DBNAME}`,
    poolMin: 1,
    poolMax: 3,
    poolIncrement: 1,
    poolTimeout: 60,
};

// initialize connection pool
async function initializeConnectionPool() {
    try {
        await oracledb.createPool(dbConfig);
        console.log('Connection pool started');
    } catch (err) {
        console.error('Initialization error: ' + err.message);
    }
}

async function closePoolAndExit() {
    console.log('\nTerminating');
    try {
        await oracledb.getPool().close(10); // 10 seconds grace period for connections to finish
        console.log('Pool closed');
        process.exit(0);
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

process.once('SIGTERM', closePoolAndExit).once('SIGINT', closePoolAndExit);

async function withOracleDB(action) {
    let connection;
    try {
        connection = await oracledb.getConnection(); // Gets a connection from the default pool
        return await action(connection);
    } catch (err) {
        console.log('hi');
        console.error(err);
        throw err;
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
}

// ----------------------------------------------------------
// Core functions for database operations
// Modify these functions, especially the SQL queries, based on your project's requirements and design.
async function testOracleConnection() {
    return await withOracleDB(async (connection) => {
        return true;
    }).catch(() => {
        return false;
    });
}

async function fetchAnimalsFromDb() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute('select * from animal');
        return result.rows;
    }).catch(() => {
        console.log('ERROR');
        return [];
    });
}

async function fetchTablesFromDb() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            'select table_name from user_tables'
        );
        return result.rows.map((r) => r[0]);
    }).catch(() => {
        console.log('ERROR');
        return [];
    });
}

async function fetchQueryResults(query) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(query, [], {
            outFormat: oracledb.OBJECT,
        });
        return result.rows;
    });
}

async function fetchQueryResultsSecure(query, params) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(query, params, {
            outFormat: oracledb.OBJECT,
        });
        return result.rows;
    });
}

module.exports = {
    initializeConnectionPool,
    testOracleConnection,
    withOracleDB,
    fetchAnimalsFromDb,
    fetchTablesFromDb,
    fetchQueryResults,
    fetchQueryResultsSecure,
};
