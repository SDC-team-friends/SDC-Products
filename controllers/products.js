const db = require('../models/products.js');

module.exports = {
  getProducts: async(req, res) => {
    let page = req.query.page || 1;
    let count = req.query.count || 5;
    try {
      const allProducts = await db.getProducts(page, count);
      res.status(200).json(allProducts);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  getProductInfo: async(req, res) => {
    let id = req.params.product_id;
    try{
      const productInfo = await db.getProductInfo(id);
      res.status(200).json(productInfo);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  getProductStyles: async(req, res) => {
    let id = req.params.product_id;
    try{
      const productStyles = {
        product_id: id,
        results: await db.getProductStyles(id)
      }
      res.status(200).json(productStyles);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  getRelatedProducts: async(req, res) => {
    let id = req.params.product_id;
    try{
      const relatedProducts = await db.getRelatedProducts(id);
      res.status(200).json(relatedProducts);
    } catch (err) {
      res.status(400).send(err);
    }
  },

}