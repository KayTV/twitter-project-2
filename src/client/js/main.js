// add scripts

$(document).on('ready', function() {
  console.log('sanity check!');
  window.tweetTimer = setInterval(getTweets, 10);
});

function stopTimer(){
  clearInterval(tweetTimer);
};

function getTweets(){
  $.ajax({
    method: 'GET',
    url: '/tweetsjson'
  }).then(function(response) {
    console.log(response);
    var tweets = response.tweets.length;
    var twitters = response.twitters.length;
    $('#tweets').html(tweets);
    $('#twitters').html(twitters);
    $('#total').html(tweets+twitters);
    console.log(tweets, twitters);
    tweetGraph(tweets, twitters);
    // for (var i=0; i<tweets.length; i++) {
    //   $('#test').append('<div class="tweetbox"><h3>'+tweets[i]+'</h3></div>');
    // }
    // for(var j=0; j<twitters.length; j++) {
    //   $('#test2').append('<div class="tweetbox"><h3>'+twitters[j]+'</h3></div>');
    // }
  });
};

function tweetGraph(tweets, twitters){
  var them = $('#twit').val();
  var that = $('#twit2').val();
  $(function () {
      $('#examplegraph').highcharts({
          chart: {
              plotBackgroundColor: null,
              plotBorderWidth: 0,
              plotShadow: false
          },
          title: {
              text: '',
              align: 'center',
              verticalAlign: 'middle',
              y: 40
          },
          credits: {
            enabled: false
          },
          tooltip: {
              pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
          },
          plotOptions: {
            series: {
              animation: false
            },
              pie: {
                  dataLabels: {
                      enabled: false,
                      distance: -40,
                      style: {
                          fontWeight: 'bold',
                          color: 'white',
                          textShadow: '0px 1px 2px black'
                      }
                  },
                  startAngle: -90,
                  endAngle: 90,
                  center: ['50%', '75%']
              }
          },
          series: [{
              type: 'pie',
              name: '',
              innerSize: '50%',
              data: [
                  ['Yours', tweets],
                  ['Theirs', twitters],

                  {
                      name: '',
                      y: 0.2,
                      dataLabels: {
                          enabled: false
                      }
                  }
              ]
          }]
      });
    });
  };
