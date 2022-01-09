const pg = require('pg');

// A "pool" represents our connection to the database
const pool = new pg.Pool({
    // Name of the database
    // This is the only required parameter
    database: 'weekend-to-do-app',
    // Optional parameters
    host: 'localhost',
    port: 5432
});

module.exports = pool;