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


// Fetch all the products from the database.
const getAllProducts = function (db) {
  return db.query(
    `
    SELECT *
    FROM products
    WHERE is_sold = 'f'
    ORDER BY id DESC;
    `
  );
};

// Fetch products by category
const getProductsByCategory = function (cateory_id, db) {
  return db.query(
    `
    SELECT * FROM products
    WHERE category_id = $1;
    `,
    [`${cateory_id}`]
  );
};

//gets product by categoryName
const getProductsByCategoryName = function (category_name, db) {
  return db.query(
    `
    SELECT products.* FROM products
    JOIN categories ON categories.id = products.category_id
    WHERE categories.name LIKE $1
    ORDER BY products.price DESC;
    `,
    [`${category_name}`]
  )
  .then((data) => {
    return data.rows;
  })
};

// Fetch product by id
const getProductById = function (product_id, db) {
  return db.query(
    `
    SELECT * FROM products
    WHERE id = $1;
    `,
    [`${product_id}`]
  );
};

// Fetch all massages
const getAllMessages = function (db) {
  return db.query(
    `
    SELECT *
    FROM texts
    ORDER BY id DESC;
    `
  );
};

// Fetch all products between the minimum and maximum price
const filterByPrice = function(min, max, db) {
  const queryParams = [
    min,
    max
  ];
  const queryString = `
  SELECT *
  FROM products
  WHERE price <= $2 AND price >= $1
  ORDER BY price DESC;`;

  return db.query(queryString, queryParams)
  .then((data) => {
    return data.rows;
  });
};


// Add a new product.
const addProduct = function(product, db) {
  const queryString = `
  INSERT INTO products (
    name,
    description,
    price,
    is_featured,
    posted_at,
    image_url,
    seller_id,
    category_id
    )
    VALUES($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *;
  `;

  const values = [
    product.name,
    product.description,
    product.price,
    product.is_featured,
    product.posted_at,
    product.image_url,
    product.seller_id,
    product.category_id
  ];

  return db
    .query(queryString, values)
    .then((result) => {
      console.log(result.rows[0]);
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
}

// Delete product
const deleteProduct = function (prodId, db) {

  db.query(`
    DELETE FROM products
    WHERE id = ${prodId};

  `)

  // .then((res) => {
  // console.log(res.rows[0])
  // })

};

// Update a product
const updateProduct = function (sold, ProdId, db) {
  db.query(`
    UPDATE products
    SET
    is_sold = ${sold}
    WHERE id = ${ProdId};
  `);
};

// get featured items
const isFeatured = (bool, db) => {
  const sqlQuery =`
  SELECT * FROM products
  WHERE is_featured = $1
  `
  return db.query(sqlQuery, [`${bool}`])
  .then((data) => {
    if(data.rows.length)
    return data.rows;
  })
}

const getAllTexts = (db) => {
  return db
  .query(
    `
    SELECT * FROM texts
  `
  )
  .then(data => {
    console.log(data)
    return data.rows
  })
};



module.exports = {
  addUser,
  getPictures,
  getUserByEmail,
  getUserById,
  getItemsToWatchById,
  getItemsToBuyById,
  getProductItemById,
  getAllProducts,
  getProductsByCategory,
  getProductsByCategoryName,
  getProductById,
  getAllMessages,
  getAllTexts,
  filterByPrice,
  addProduct,
  deleteProduct,
  updateProduct,
  isFeatured
};
