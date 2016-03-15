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

var tweets1 = [];
var tweets2 = [];
var tweet = channels.stream1;
var tweet2 = channels.stream2;
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

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Break It Apart!!', profile: req.user, tweets: tweets1, twitters: tweets2 })
});

router.get('/tweets', function(req, res, next) {
  res.render('tweets', { title: 'Twitter & Passport', profile: req.user, tweets: tweets1, twitters: tweets2 })
});

router.get('/charts', function(req, res, next) {
  res.render('charts', { title: 'Twitter & Passport', profile: req.user, tweets: tweets1, twitters: tweets2 })
});

router.post('/charts', function(req, res, next) {
  tweet = req.body.twit;
  tweet2 = req.body.twit2
  restart(tweet, tweet2);
  res.redirect('/charts')
});

router.get('/stoptweets', function(req, res, next){
  stopTweets();
  res.redirect('/charts')
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
    stream.stop();//closes the stream connected to Twitter
  	console.log('>stream closed after 100 seconds');
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
