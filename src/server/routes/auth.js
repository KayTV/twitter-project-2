var express = require('express');
var router = express.Router();
var passport = require('passport');
// var knex = require('../../../db/knex');

router.get('/twitter', passport.authenticate('twitter'));

router.get('/twitter/callback', passport.authenticate('twitter', {
  failureRedirect: '/'
}), function (req, res, next) {
  console.log('user:', req.user);
  res.redirect('/');
});

router.get('/logout', function(req, res, next) {
  // req.session = null;
  req.logout();
  res.redirect('/');
});

module.exports = router;
