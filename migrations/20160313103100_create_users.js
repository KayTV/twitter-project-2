exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table){
    table.increments();
    table.string('twitter_id').unique();
    table.string('display_name');
    table.string('avatar_url');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
