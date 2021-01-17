const TEST_DB_CONFIG = require('../knexfile')['test']

let knex = require("knex")

describe('Tasks tests', () => {

  beforeEach(async () => {
    knex = require("knex")(TEST_DB_CONFIG)
    await knex.migrate.latest(TEST_DB_CONFIG)
  })

  it('should create a new task', async () => {
    const task = {
      name: 'Learn MYSQL',
      description: 'Get better at mysql to improve skill',
      dueDate: '2021-11-11',
      completed: false,
    }
    await knex('tasks').insert(task)
    const checkResult = await knex.select('*').from('tasks')
    expect(checkResult[0].name).toStrictEqual(task.name)
    expect(checkResult[0].description).toStrictEqual(task.description)

  })

  afterEach(async (done) => {
    await knex.migrate.rollback(TEST_DB_CONFIG, true)
    console.log("Destroying knex connection");
    await knex.destroy()
    done()
  })
})