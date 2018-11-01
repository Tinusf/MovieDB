import knex from 'knex';


const db = knex({
  client: 'sqlite3',
  connection: {
    filename: '/var/database/database.sqlite'
  }
});

export default db;
