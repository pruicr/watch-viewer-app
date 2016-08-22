// call dependencies
var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var Watch = require('./app/models/watch.js');
var port = process.env.PORT || 3000;

var app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://test:test@ds013486.mlab.com:13486/disney-watches');

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vdn.api+json'}));
app.use(methodOverride());

// routes

app.post('/api/watches', function(req, res) {
    var watch = new Watch();
    watch.name = req.body.name;
    watch.brand = req.body.brand;
    watch.description = req.body.description;
    watch.caseSize = req.body.caseSize;
    watch.lugSize = req.body.lugSize;
    watch.bezelColor = req.body.bezelColor;
    // save the watch
    watch.save(function(err) {
        if (err) {
            res.send(err);
        }
        res.json({
            message: 'Watch created!'
        });
    });
});
app.get('/api/watches', function(req, res) {
    Watch.find(function(err, watches) {
        if (err) {
            res.send(err);
        }
        res.json(watches);
    });
});
app.get('/api/watches/:watch_id', function(req, res) {
    Watch.findById(req.params.watch_id, function(err, watch) {
        if (err) {
            res.send(err);
        }
        res.json(watch);
    });
});
app.put('/api/watches/:watch_id', function(req, res) {
    Watch.findById(req.params.watch_id, function(err, watch) {
        if (err) {
            res.send(err);
        }
        if (req.body.name) {
            watch.name = req.body.name;
        }
        // save the watch
        watch.save(function(err) {
            if (err) {
                res.send(err);
            }
            res.json({
                message: 'Watch updated!'
            });
        });
    });
});
app.delete('/api/watches/:watch_id', function(req, res) {
    Watch.remove({
        _id: req.params.watch_id
    }, function(err, watch) {
        if (err) {
            res.send(err);
        }
        res.json({
            message: 'Watch deleted!'
        });
    });
});

app.all('*', function(req, res, next) {
    res.sendFile('/public/index.html', {root: __dirname});
});

app.listen(port, function() {
    console.log('Listening on port ' + port);
});