module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/twitter_app'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }

};
