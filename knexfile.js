// Update with your config settings.

module.exports = {
  test: {
    client: "mysql2",
    connection: {
      host: "localhost",
      user: "root",
      password: "knex",
      database: "knex_practice_test"
    },
    migrations: {
      tableName: 'migrations'
    },
    pool: {
      min: 1, max: 1,
    }
  },
  development: {
    client: "mysql2",
    connection: {
      host: "localhost",
      user: "knex_user",
      password: "knex",
      database: "knex_practice"
    },
    migrations: {
      tableName: 'migrations'
    },
    pool: {
      min: 0, max: 7,
    }
  },
  staging: {
    client: "mysql2",
    connection: {
      host: "localhost",
      user: "knex_user",
      password: "knex",
      database: "knex_practice"
    },
    migrations: {
      tableName: 'migrations'
    },
    pool: {
      min: 0, max: 7,
    }
  },
  production: {
    client: "mysql2",
    connection: {
      host: "localhost",
      user: "knex_user",
      password: "knex",
      database: "knex_practice"
    },
    migrations: {
      tableName: 'migrations'
    },
    pool: {
      min: 0, max: 7,
    }
  }

};
