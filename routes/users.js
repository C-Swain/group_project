const express = require("express");
const router = express.Router();
const {
  addUser,
  getUserByEmail,
  isFeatured,
  getAllTexts,
  getUserById,
  getItemsToWatchById,
  getItemsToBuyById,
  getProductItemById,
  addProduct,
  deleteItem
} = require('../database')


router.use(express.urlencoded({ extended: true }));


module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then((data) => {
        console.log(data)
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
        console.log(data.rows[0].is_admin)
        req.session.user_isAdmin = data.rows[0].is_admin;
        req.session.user_id = data.rows[0].id ;
        req.session.user_name = data.rows[0].name;
        res.redirect("store")
      }
    })
});
// message route
router.get("/messages", (req, res) => {
  getAllTexts(db)
  .then(data => {
    res.json(data)
  })
})

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
      req.session.user_isAdmin = false;
      req.session.user_name = data.rows[0].name;
      res.redirect("/");
      })
})


// use we have the log in working with cookies we can active this property currently just making the page
router.get("/store", (req, res) => {
  const user = req.session.user_name;
  isFeatured(true, db)
  .then(data => {

    // console.log('this',data)S

    const templateVars = { data ,user }

    res.render("store", templateVars);
    });


  });


// message route
router.get("/messages", (req, res) => {
  getAllTexts(db)
  .then(data => {
    res.json(data)
  })
})


// we will need a route to log the favourite page . it will take the ID of the user
// and display things they have addedto favourites
//router.get("/favourites", (req, res) => {
  // const userID = req.session.user_id;
  // const loggedinUser = users[userID];
  // const templateVars = { user: loggedinUser };
  //res.render("Favourite");
// })

// the logout route
 router.post('/logout', (req, res) => {
   req.session.user_id = null;
   req.session.user_isAdmin = null;
   req.session.user_name = null;
   res.redirect("/");
 })



  return router;
};
