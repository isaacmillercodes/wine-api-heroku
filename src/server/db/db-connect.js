const pgp = require('pg-promise')();

// Database connection details;
const cn = {
  host: 'isaac-miller-wine.heroku.com', // 'localhost' is the default;
  port: 5432, // 5432 is the default;
  database: 'wine_cellar'
};

const db = pgp(cn);

module.exports = db;
