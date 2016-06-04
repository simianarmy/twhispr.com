var PORT = process.env.PORT || 8080;
var express = require("express");
var qs = require('querystring');

var app = express();
app.use(app.router);
app.use(express.static(__dirname + "/public"));
app.set('views', './views')
app.set('view engine', 'jade');

S3_URL = 'https://s3-us-west-2.amazonaws.com/horsejs/';
MAX_IMAGES = 49;

function randomImageUrl () {
    return 'https://twhispr.com/images/' + (Math.floor(Math.random() * (MAX_IMAGES - 1)) + 1) + '.jpg';
}

// Renders the Twitter Card player container page
app.get('/cards/:author/:scid/:trackId', function (req, res) {
    // TODO: Get the soundcloud track ID
    //var trackId = 192289050;

    res.render('card', {
        author: req.params.author,
        scId: req.params.scid,
        scTrackId: req.params.trackId,
        randomImage: randomImageUrl()
    });
});

// Renders the embedded soundcloud player iframe
app.get('/player/:trackId', function (req, res) {
    res.render('player', {
        scTrackId: req.params.trackId
    });
});

// V2 - Attempting to serve audio files from S3 instead of Shitcloud
// Renders the Twitter Card player container page
app.get('/v2/cards/:author/:trackId', function (req, res) {
    var trackUrl = S3_URL + req.params.trackId + '.mp3';

    res.render('v2/card', {
        author: req.params.author,
        trackId: req.params.trackId,
        trackUrl: trackUrl,
        trackUrlEncoded: qs.escape(trackUrl),
        randomImage: randomImageUrl()
    });
});

// Renders the embedded soundcloud player iframe
app.get('/v2/player/:trackId', function (req, res) {
    var trackUrl = S3_URL + req.params.trackId + '.mp3';
    var ua = req.headers['user-agent'];
    var iOS = /iPad|iPhone|iPod/.test(ua);

    //console.log(req.useragent);
    res.render('v2/player', {
        trackUrl: trackUrl,
        trackUrlEncoded: qs.escape(trackUrl),
        autoplay: !iOS,
        randomImage: randomImageUrl()
    });
});

console.log('Listening on port ' + PORT);
app.listen(PORT);
