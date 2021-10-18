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

const getPictures = function(db, limit) {
  return db.query(
    `
    SELECT image_url FROM products
    ORDER BY RANDOM()
    LIMIT $1 `,
    [limit]
  )
  .then(data => {

    if(data.rows.length) {
      return data.rows;
    }
  });
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
  getPictures,
  getUserByEmail,
  getUserById,
  getItemsToWatchById,
  getItemsToBuyById,
  getProductItemById,
  addProduct,
  deleteItem
};
