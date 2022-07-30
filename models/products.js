const pool = require('../databases/db.js');

module.exports = {
  getProducts: async (page, count) => {
    const q = `SELECT * FROM products ORDER BY id LIMIT ${count} OFFSET ${(page - 1) * count}`
    try {
      const res = await pool.query(q);
      return res.rows;
    } catch (err) {
      console.error(err);
    }
  },

  getProductInfo: async (id) => {
    const q = `
      SELECT products.*,
             (SELECT jsonb_agg(jsonb_build_object('feature', features.feature, 'value', features.value))
             FROM features WHERE features.product_id = ${id}) AS "features"
      FROM Products WHERE products.id = ${id}
    `;
    try {
      const res = await pool.query(q);
      return res.rows[0];
    } catch (err) {
      console.error(err);
    }
  },

  getProductStyles: async(id) => {
    const q = `
      SELECT styles.id AS "style_id",
             name,
             original_price,
             replace(sale_price, 'null', '0') AS "sale_price",
             default_style AS "default?",
             (SELECT jsonb_agg(jsonb_build_object('thumbnail_url', photos.thumbnail_url, 'url', photos.url))
             FROM photos WHERE photos.style_id=styles.id) AS "photos",
             (SELECT jsonb_object_agg(skus.id, jsonb_build_object('quantity', skus.quantity, 'size', skus.quantity))
             FROM skus WHERE skus.style_id=styles.id) AS "skus"
      FROM styles WHERE styles.product_id=${id} ORDER BY styles.id
    `;
    try {
      const res = await pool.query(q);
      return res.rows;
    } catch (err) {
      console.error(err);
    }
  },

  getRelatedProducts: async(id) => {
    const q = `SELECT jsonb_agg(DISTINCT related_product_id) AS "related" FROM related WHERE current_product_id = ${id}`;
    try {
      const res = await pool.query(q);
      return res.rows[0].related;
    } catch (err) {
      console.error(err);
    }
  },

}