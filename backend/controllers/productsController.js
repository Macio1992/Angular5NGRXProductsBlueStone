let mongoose = require('mongoose');
let Product = require('../models/product');

exports.get_all_products = (req, res) => {
    Product.find({}).populate({path: 'images', model: 'Image'}).exec((error, products) => {
        if(error){ res.send(error); }
        else { res.json(products); }
    });
};

exports.create_product = (req, res) => {
    let new_product = new Product(req.body);

    new_product.save((err) => {
        if(err){ res.send(err); }
        else {
            res.send({message: 'Product created'});
        }
    })
};

exports.get_product = (req, res) => {
    Product.findById(req.params.product_id).populate({ path: 'images', model: 'Image'}).exec((err, product) => {
        if(err) { res.send(err); }
        else { res.json(product); }
    });
};

exports.update_product = (req, res) => {
    Product.findOneAndUpdate({ _id: req.params.product_id}, req.body, { new: true }, (err, product) => {
        if(err){ res.send(err); }
        else { res.json (product); }
    });
};

exports.delete_product = (req, res) => {
    Product.findOneAndRemove({_id: req.params.product_id}, (err) => {
        if(err){ res.send(err); }
        else { res.json({ message: `Product with id: ${req.params.product_id} was successfully removed` }); }
    });
};