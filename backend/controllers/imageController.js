let mongoose = require('mongoose');
let Image = require('../models/image');
let Product = require('../models/product');

exports.add_image = (req, res) => {

    Product.findById(req.params.product_id, (err, product) => {
        if(err){ res.send(err); }
        else {

            let image = new Image();
            image.url = req.body.url;
            image.name = req.body.name;

            product.images.push(image);

            image.save((err) => {
                if(err){ res.send(err); }
            })
            
            product.save((err) => {
                if(err){ res.send(err); }
                else {
                    res.json({message: `Image added to product ${req.params.product_id}`});
                }
            });
        }
    });
};

exports.update_image = (req, res) => {
    Image.findByIdAndUpdate(req.params.image_id, req.body, { new: true }, (err, image) => {
        if(err) { res.send(err); }
        else { res.json(image); }
    });
};

exports.delete_image = (req, res) => {
    Image.findByIdAndRemove(req.params.image_id, (err) => {
        if(err) { res.send(err); }
        else { res.json({message: `Image with id: ${req.params.image_id} successfully removed`}); }
    });
};