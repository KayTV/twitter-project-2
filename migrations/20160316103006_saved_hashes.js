exports.up = function(knex, Promise) {
  return knex.schema.createTable('saved_hashes', function(table){
    table.increments();
    table.string('hash1');
    table.string('hash2');
    table.string('hash3');
    table.string('hash4');
    table.string('hash5');
    table.integer('user_id').references('users.id');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('saved_hashes');
};
