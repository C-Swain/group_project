const addUser = function(user, db) {
  return db 
    .query(
      `INSERT INTO users(name, email, password) VALUES($1,$2,$3) RETURNING *;`,
      [`${user.name}`, `${user.email}`, `${user.password}`]
    )
    .then(data => {
      if(data.rows.length) {
        return data.rows[0];
      }
    });
};

const getUserByEmail = function(email, db) {
  return db
    .query(`SELECT * FROM users WHERE email=$1`, 
    [`${email}`]
    );
};

const getUserById = function(id, db) {
  return db
    .query(`SELECT * FROM users WHERE id=$1`,
    [`${id}`]
    );
};

const getItemsToWatchById = function (user_id, db) {
  return db.query(
    `
    SELECT * FROM movies
    JOIN items
    ON movies.item_id = items.id
    JOIN users
    ON items.user_id = users.id
    WHERE users.id = $1 
    ORDER BY created_at DESC;
    `,
    [`${user_id}`]
  );
};

const getItemsToReadById = function (user_id, db) {
  return db.query(
    `
    SELECT * FROM books
    JOIN items
    ON books.item_id = items.id
    JOIN users
    ON items.user_id = users.id
    WHERE users.id = $1 
    ORDER BY created_at DESC;
    `,
    [`${user_id}`]
  );
};

const getItemsToBuyById = function (user_id, db) {
  return db.query(
    `
    SELECT * FROM products
    JOIN items
    ON products.item_id = items.id
    JOIN users
    ON items.user_id = users.id
    WHERE users.id = $1 
    ORDER BY created_at DESC;
    `,
    [`${user_id}`]
  );
};


const getPlacesToEatById = function (user_id, db) {
  return db.query(
    `
    SELECT * FROM restaurants
    JOIN items
    ON restaurants.item_id = items.id
    JOIN users
    ON items.user_id = users.id
    WHERE users.id = $1 
    ORDER BY created_at DESC;
    `,
    [`${user_id}`]
  );
};

const getMovieItemById = function (item_id, db) {
  return db.query(
    `
    SELECT * FROM items
    JOIN movies
    ON items.id = item_id
    WHERE item_id = $1;
    `,
    [`${item_id}`]
  );
};

const getRestaurantItemById = function (item_id, db) {
  return db.query(
    `
    SELECT * FROM items
    JOIN restaurants
    ON items.id = item_id
    WHERE item_id = $1;
    `,
    [`${item_id}`]
  );
};

const getBookItemById = function (item_id, db) {
  return db.query(
    `
    SELECT * FROM items
    JOIN books
    ON items.id = item_id
    WHERE item_id = $1;
    `,
    [`${item_id}`]
  );
};
const getProductItemById = function (item_id, db) {
  return db.query(
    `
    SELECT * FROM items
    JOIN products
    ON items.id = item_id
    WHERE item_id = $1;
    `,
    [`${item_id}`]
  );
};

// adding items

const addBook = function (values, db) {
  return db.query(
    `
    INSERT INTO books (
      item_id,
      name,
      author,
      rating,
      detail
      )
      VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
    `,
    values
  );
};

const addMovie = function (values, db) {
  return db.query(
    `
    INSERT INTO movies (
      item_id,
      name,
      description,
      runtime,
      rating
      )
      VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
    `,
    values
  );
};

const addProduct = function (values, db) {
  return db.query(
    `
    INSERT INTO products (
    item_id,
    name,
    description,
    link
    )
    VALUES($1, $2, $3, $4)
  `,
    values
  );
};

const addRestaurant = function (values, db) {
  return db.query(
    `
    INSERT INTO restaurants (
      item_id,
      name,
      street,
      city,
      province,
      post_code,
      rating
    )
    VALUES($1, $2, $3, $4, $5, $6, $7)
  `,
    values
  );
};

//delete an item
const deleteItem = function (itemId, category, db) {

  db.query(`
DELETE FROM ${category}
WHERE item_id = ${itemId};
  `);
};

module.exports = {
  addUser,
  getUserByEmail,
  getUserById,
  getItemsToWatchById,
  getItemsToReadById,
  getItemsToBuyById,
  getPlacesToEatById,
  getMovieItemById,
  getRestaurantItemById,
  getBookItemById,
  getProductItemById,
  addMovie,
  addBook,
  addRestaurant,
  addProduct,
  deleteItem
};