let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
let Product = require('../models/product');

module.exports = (config) => {
    let dbURi = config.dev.db;

    mongoose.connect(dbURi).then(() => {
        console.log(`Connected to ${dbURi}`);
    }).catch((e) => {
        throw e;
    });

    mongoose.connection.on('connected', (req, res) => {
        let products = require('../data/products.json');

        // Product.remove((err) => {
        //     if(err){ console.log('Error from Mongo'); }
        //     else {
        //         Product.collection.insertMany(products, (err) => {
        //             if(err) { console.log('Error while inserting products'); }
        //             else { console.log('Products added'); }
        //         });
        //     }
        // });
    });
}