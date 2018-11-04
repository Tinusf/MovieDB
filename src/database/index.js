import knex from 'knex';

const db = knex({
  client: 'sqlite3',
  connection: {
    filename: '../../database.sqlite'
  }
});

export default db;
