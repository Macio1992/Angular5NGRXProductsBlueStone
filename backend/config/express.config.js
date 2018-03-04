let path = require('path');
let bodyParser = require('body-parser');
let express = require('express');
let product = require('../routes/product');
let image = require('../routes/image');
let cors = require('cors');

module.exports = (app) => {
    
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        next();
    });
    app.use(
        cors({
            credentials: true,
            origin: 'http://localhost:4200',
        })
    );

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ 'extended': 'false'}));
    app.use(express.static(path.join(__dirname, '../../dist')));
    app.use('/products', express.static(path.join(__dirname, '../../dist')));
    app.use('/product', product);
    app.use('/image', image);
    
}