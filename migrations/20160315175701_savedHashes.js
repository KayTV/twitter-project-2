exports.up = function(knex, Promise) {
  return knex.schema.createTable('saved_hash', function(table){
    table.increments();
    table.string('hash1').unique();
    table.string('hash2');
    table.string('hash3');
    table.string('hash4');
    table.string('hash5');
    table.decimal('user_id');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('saved_hash');
};
