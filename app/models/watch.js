var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WatchSchema = new Schema({
    name: String,
    brand: String,
    description: String,
    caseSize: Number,
    lugSize: Number,
    bezelColor: String
});

module.exports = mongoose.model('Watch', WatchSchema);