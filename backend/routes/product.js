let express = require('express');
let router = express.Router();
let productController = require('../controllers/productsController');

router.get('/', productController.get_all_products);
router.post('/', productController.create_product);
router.get('/:product_id', productController.get_product);
router.put('/:product_id', productController.update_product);
router.delete('/:product_id', productController.delete_product);

module.exports = router;