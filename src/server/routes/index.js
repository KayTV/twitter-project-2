var express = require('express');
var router = express.Router();
var Twitter = require('twitter');
var twitterStreamChannels = require('twitter-stream-channels');
var twit = new twitterStreamChannels({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  });

var channels = {
  'stream1': 'javascript',
  'stream2': 'css'
};
var knex = require('../../../db/knex');
var tweets1 = [];
var tweets2 = [];
var tweet;
var tweet2;
console.log(tweet);
console.log(tweet2);
var stream;

// client.stream('statuses/filter', {track: 'javascript'}, function(stream) {
//   stream.on('data', function(tweet) {
//     console.log(tweet.text);
//     tweets1.push(tweet.text);
//   });
//
//   stream.on('error', function(error) {
//     throw error;
//   });
//   client.currentstream = stream;
// });

// function authorize(req,res, next){
//   if (!req.user){
//     next();
//   } else {
//     res.status(403).send('Forbidden');
//   }
// }

router.get('/', function(req, res, next) {
  console.log(req.user);
  res.render('index', { title: 'Smashtag!', profile: req.user, tweets: tweets1, twitters: tweets2 })
});

router.get('/savedcharts', function(req, res, next) {
  res.render('savedcharts', { title: 'Saved Charts!', profile: req.user, tweets: tweets1, twitters: tweets2 })
});

router.get('/charts', function(req, res, next) {
  console.log(req.user);
  res.render('charts', { title: 'Match Up Your Hashtags', profile: req.user, tweets: tweets1, twitters: tweets2 })
});

router.post('/')

router.post('/charts', function(req, res, next) {
  console.log(req.user);
  tweet = req.body.twit;
  tweet2 = req.body.twit2

  // knex('saved_hashes').insert({
  //   hash1: req.body.twit,
  //   hash2: req.body.twit2,
  //   hash3: null,
  //   hash4: null,
  //   hash5: null,
  //   user_id: req.user.id
  // })
  restart(tweet, tweet2);

  res.redirect('/charts')
});

// router.post('/save', function(req, res, next){
//   var id = req.user.id
//   knex('saved_hashes').insert({
//     hash1: req.body.twit,
//     hash2: req.body.twit2,
//     hash3: null,
//     hash4: null,
//     hash5: null,
//     user_id: id
//   });
//   res.redirect('/');
// });

router.get('/stoptweets', function(req, res, next){
  stopTweets();
})

router.get('/tweetsjson', function(req, res, next) {
  res.json({tweets: tweets1, twitters: tweets2});
})

function restart(hashtag, hashtag2) {
  if(stream) {
    stream.stop();
  }
  tweets1 = [];
  tweets2 = [];
  channels = {
    'stream1': hashtag,
    'stream2': hashtag2
  };

  console.log(hashtag, hashtag2);
  stream = twit.streamChannels({track: channels});
  stream.on('channels/stream1', function(tweet){
    if(tweet.text){
      tweets1.push(tweet.text);
    }
    console.log(tweet.text);

  })
  stream.on('channels/stream2', function(tweet){
    if(tweet.text){
      tweets2.push(tweet.text);
    }
    console.log(tweet.text);
  })
}

function stopTweets() {
    stream.stop();
    // stream.stop(tweet2);//closes the stream connected to Twitter
}



// function restart (hashtag) {
//   client.currentstream.destroy();
//   tweets1 = [];
//   client.stream('statuses/filter', {track: hashtag}, function(stream) {
//     stream.on('data', function(tweet) {
//       console.log(tweet.text);
//       tweets1.push(tweet.text);
//     });
//
//     stream.on('error', function(error) {
//       throw error;
//     });
//     client.currentstream = stream;
//   });
// }
//



module.exports = router;
