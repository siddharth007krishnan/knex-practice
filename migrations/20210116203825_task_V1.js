const TABLE_NAME = 'tasks'

exports.up = function (knex) {
  return knex.schema.hasTable(TABLE_NAME).then(function (exists) {
    if (!exists) {
      return knex.schema.createTable(TABLE_NAME, function (table) {
        table.uuid('id').primary().defaultTo(knex.raw("(UUID())"));
        table.string('name');
        table.text('description', 'mediumtext');
        table.date('dueDate');
        table.boolean('completed');
        table.datetime('createdAt').defaultTo(knex.fn.now());
        table.datetime('updatedAt').defaultTo(knex.fn.now());
        table.datetime('deletedAt');
      });
    }
  })
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists(TABLE_NAME)
};
