/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/products
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const { getProductsByCategoryName,
 } = require('../database')

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


 // this renders a page using the category indicated
 router.get("/:category", (req, res) => {
   const category =req.params.category;
  // const userID = req.session.user_id;
  //  const loggedinUser = users[userID];

// we will have a function that  makes a sql query based on the category inputed in order to select only thoose items
getProductsByCategoryName(category, db)
.then(data => {

  console.log('this',data)

 const templateVars = {data ,category};
  console.log(data)

  res.render("category", templateVars);
  });

})

return router

};
