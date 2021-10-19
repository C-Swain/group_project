const express = require("express");
const router = express.Router();
const {
  addUser,
  getUserByEmail,
  isFeatured,
  getUserById,
  getItemsToWatchById,
  getItemsToBuyById,
  getProductItemById,
  addProduct,
  deleteItem
} = require('../database')


router.use(express.urlencoded({ extended: true }));
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");


module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then((data) => {
        const users = data.rows;
        res.json({ users });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });


router.get("/login", (req, res) => {
  const templateVars = { user: null };
  res.render("login", templateVars);
});

router.post('/login', (req, res) => {
  const user = req.body;

  getUserByEmail(user.email, db)
    .then(data => {
      // check if email exists
      if(!data.rows[0]) {
        res.send('register')
      } else {
        console.log(data.rows[0].id)
        req.session.user_id = data.rows[0].id ;
        res.redirect('store')
      }
    })
});


router.get("/register", (req, res) => {
  // here we check the cookies if you are logged in you are sent to URLS
    const templateVars = { user: null };
    res.render("register", templateVars);


})

// This sends registration to database
router.post("/register", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = req.body;

      if (email === "" || password === "") {
      return res.status(400).send("please fill out a valid email and password");
       }
      addUser(user, db)
      getUserByEmail(user.email, db)
      .then (data => {
       console.log(data.rows[0].id);
       req.session.user_id = data.rows[0].id ;
       return res.send('logged in successfully');
      })
})


// use we have the log in working with cookies we can active this property currently just making the page
router.get("/store", (req, res) => {

  isFeatured(true, db)
  .then(data => {
    
    console.log('this',data)
    
    const templateVars = { data }
    
    res.render("store", templateVars);
    });
    // console.log(data)
    // const templateVars = {
    //   data: data
    // }
    
  });
  // console.log(templateVars);
  // const templateVars = { keyImage }




// we will need a route to log the favourite page . it will take the ID of the user
// and display things they have addedto favourites
//router.get("/favourites", (req, res) => {
  // const userID = req.session.user_id;
  // const loggedinUser = users[userID];
  // const templateVars = { user: loggedinUser };
  //res.render("Favourite");
// })

// space to post new todo item
// app.post("/BUY", (req, res) => {
//   const userID = req.session.user_id;
//   const loggedinUser = users[userID]
//
// });
 router.post('/logout', (req, res) => {
   req.session.user_id = null;
   res.send({});
 })



  return router;
};
