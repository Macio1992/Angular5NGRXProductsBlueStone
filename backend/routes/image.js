let express = require('express');
let router = express.Router();
let imageController = require('../controllers/imageController');

router.post('/:product_id', imageController.add_image);
router.put('/:image_id', imageController.update_image);
router.delete('/:image_id', imageController.delete_image);

module.exports = router;