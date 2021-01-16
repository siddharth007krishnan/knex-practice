const TEST_DB_CONFIG = require('../knexfile')['test']

let knex = require("knex")

describe('Tasks tests', () => {

  beforeEach(async () => {
    knex = require("knex")(TEST_DB_CONFIG)
    await knex.migrate.latest(TEST_DB_CONFIG)
  })

  it('should create a new task', async () => {
    console.log(knex)
  })

  afterEach(async (done) => {
    await knex.migrate.rollback(TEST_DB_CONFIG)
    console.log("Destroying knex connection");
    await knex.destroy()
    done()
    console.log(knex)
  })
})