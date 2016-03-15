// add scripts

$(document).on('ready', function() {
  console.log('sanity check!');
  var timer = null;
  timer = setInterval(getTweets, 2000);
  $('#stop_tweet').on('click', function(){
     clearInterval(timer);
   })

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
    $('#test2').html('');
    for (var i=0; i<tweets.length; i++) {
      $('#test').append('<div class="tweetbox"><h3>'+tweets[i]+'</h3></div>');
    }
    for(var j=0; j<twitters.length; j++) {
      $('#test2').append('<div class="tweetbox"><h3>'+twitters[j]+'</h3></div>');
    }
  });
}
