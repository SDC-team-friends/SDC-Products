const express = require('express');
const router = express.Router();
const controllers = require('../controllers/products.js');

router.get('/', controllers.getProducts);
router.get('/:product_id', controllers.getProductInfo);
router.get('/:product_id/styles', controllers.getProductStyles);
router.get('/:product_id/related', controllers.getRelatedProducts);

module.exports = router;