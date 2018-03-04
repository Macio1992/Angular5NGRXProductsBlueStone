let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let imageSchema = new Schema({
    url: String,
    name: String,
});

module.exports = mongoose.model('Image', imageSchema);