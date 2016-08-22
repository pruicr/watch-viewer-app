var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WatchSchema = new Schema({
    name: String,
    description: String,
    color: String
});

module.exports = mongoose.model('Watch', WatchSchema);