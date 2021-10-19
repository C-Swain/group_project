/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/products
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

// code that diplays api of products for trouble shooting
module.exports = (db) => {
  router.get("/", (req, res) => {
    let query = `SELECT * FROM products`;
    console.log(query);
    db.query(query)
      .then(data => {
        const items = data.rows;
        res.json({ items});
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
