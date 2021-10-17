/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

const { addNewUser, generateRandomString, getUserByEmail, validateUser } = require("../helpers");
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

router.put("/api/users/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email, password);


  if (email === "" || password === "") {
    return res.status(400).send("please fill out a valid email and password");
  }
  const result = validateUser(db, email, password);

  if (result.error) {
    res.send(result.error);
  }
  const userID = result.user.id;
  req.session.user_id = userID;
  return res.redirect("/");

});

//this logs out the User
router.post("/logout", (req, res) => {
  req.session = null;
  res.redirect("/login");
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

  if (email === "" || password === "") {
    return res.status(400).send("please fill out a valid email and password");
  }
})

// use we have the log in working with cookies we can active this property currently just making the page
router.get("/todo/new", (req, res) => {
  // const userID = req.session.user_id;
  // const loggedinUser = users[userID];
  // const templateVars = { user: loggedinUser };
  res.render("todo_new");
})

// space to post new todo item
// app.post("/smarttodo", (req, res) => {
//   const userID = req.session.user_id;
//   const loggedinUser = users[userID]
//
// });

  return router;
};
