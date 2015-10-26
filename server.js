var PORT = process.env.PORT || 8080;
var express = require("express");

var app = express();
app.use(app.router);
app.use(express.static(__dirname + "/public"));
app.set('views', './views')
app.set('view engine', 'jade');

// Renders the Twitter Card player container page
app.get('/cards/:author/:scid/:trackId', function (req, res) {
    // TODO: Get the soundcloud track ID
    //var trackId = 192289050;
    var max = 49;

    res.render('card', {
        author: req.params.author,
        scId: req.params.scid,
        scTrackId: req.params.trackId,
        randomImage: (Math.floor(Math.random() * (max - 1)) + 1) + '.jpg'
    });
});

// Renders the embedded soundcloud player iframe
app.get('/player/:trackId', function (req, res) {
    res.render('player', {
        scTrackId: req.params.trackId
    });
});

console.log('Listening on port ' + PORT);
app.listen(PORT);
