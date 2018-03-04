let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ProductSchema = new Schema({
    name: String,
    number: String,
    description: String,
    images: [{type: Schema.Types.ObjectId, ref: 'Image'}]
});

module.exports = mongoose.model('Product', ProductSchema);