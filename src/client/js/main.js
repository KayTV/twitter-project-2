// add scripts

$(document).on('ready', function() {
  console.log('sanity check!');
  setInterval(getTweets, 2000);
  tweetGraph();
  tweetGraph2();
});

function getTweets(){
  $.ajax({
    method: 'GET',
    url: '/tweetsjson'
  }).then(function(response) {
    console.log(response);
    var tweets = response.tweets;
    var twitters = response.twitters;
    $('#test').html('');
    for (var i=0; i<tweets.length; i++) {
      $('#test').append('<div class="tweetbox"><h3>'+tweets[i]+'</h3></div>');
      $('#test2').append('<div class="tweetbox"><h3>'+twitters[i]+'</h3></div>');
    }
  });
}
