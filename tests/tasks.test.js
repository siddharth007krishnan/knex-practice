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

  it('should update a new task by updating its dueDate', async () => {
    const task = {
      name: 'Learn MYSQL',
      description: 'Get better at mysql to improve skill',
      dueDate: '2021-11-11',
      completed: false,
    }
    await knex('tasks').insert(task)
    const { id } = await knex.select('id').from('tasks').where('dueDate', '=', task.dueDate).first()
    const saved = await knex.select('*').from('tasks').first()
    const patchedTask = {
      dueDate: '2021-11-14',
    }
    await knex('tasks').where('id', '=', id).update(patchedTask)
    const result = await knex.select('*').from('tasks').where('id', '=', id).first()
    expect(result.id).toStrictEqual(id) 
  })

  it('should delete a new task by soft deleting it', async () => {
    const task = {
      name: 'Learn MYSQL',
      description: 'Get better at mysql to improve skill',
      dueDate: '2021-11-11',
      completed: false,
    }
    await knex('tasks').insert(task)
    const { id } = await knex.select('id').from('tasks').where('dueDate', '=', task.dueDate).first()
    await knex('tasks').where('id', '=', id).update({ 
      deletedAt: knex.fn.now()
    })
    const result = await knex.select('*').from('tasks').where('id', '=', id).first()
    expect(Boolean(result.deletedAt)).toStrictEqual(true)
  })

  it('should ignore all soft deleted records while fetching them', async () => {
    const task = {
      name: 'Learn about transactions',
      description: 'Get better at handling transactions',
      dueDate: '2021-11-13',
      completed: false,
    }
    await knex('tasks').insert(task)
    const { id, name } = await knex.select('*').from('tasks').whereNull('deletedAt').first()
    expect(name).toStrictEqual(task.name)
    await knex('tasks').where('id', '=', id).update({ deletedAt: knex.fn.now() })
    const result = await knex.select('*').from('tasks').whereNull('deletedAt').first()
    const temp = await knex.select('*').from('tasks').where('id', '=', id)
    console.log({ temp })
    expect(temp.updatedAt).toStrictEqual(temp.deletedAt)
    expect(result).toBe(undefined)
  })

  afterEach(async (done) => {
    await knex.migrate.rollback(TEST_DB_CONFIG, true)
    console.log("Destroying knex connection");
    await knex.destroy()
    done()
  })
})