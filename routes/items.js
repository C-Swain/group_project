/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/products
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const { getProductsByCategoryName,
 } = require('../database');
 const { filterByPrice } = require('../database')

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

router.get("/filterPrice", (req, res) => {
  const templateVars = req.params;
  res.render("filterPrice", templateVars);
});

// This renders to the products list page with the given price range
router.post("/filterPrice", (req, res) => {

  console.log('params: ',req.body);

  const min = req.body.min;
  const max = req.body.max;

  // db helper function to get the products after filtering by price
  filterByPrice(min, max, db)
  .then(data => {
    //console.log('After Filtering with price: ',data)
    const templateVars = {data};

    res.render("filterPrice", templateVars);
  });

});

 // this renders a page using the category indicated
 router.get("/:category", (req, res) => {
  const category =req.params.category;
  const loggedinUser = req.session.user_id
  const isAdmin = req.session.user_isAdmin;
  const user = req.session.user_name;
  console.log("logged in User Id", loggedinUser )
  console.log("is Admin", isAdmin )
  console.log("Hello", user)

  if (!loggedinUser) {
    res.send("You must login in order to view by category")
  }

// we will have a function that  makes a sql query based on the category inputed in order to select only thoose items
getProductsByCategoryName(category, db)
.then(data => {

 const templateVars = {data ,category , user};


  res.render("category", templateVars);
  });

})

return router

};
