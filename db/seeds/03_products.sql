-- data for products
INSERT INTO products (name, description, price, is_featured, image_url, seller_id, category_id, is_sold)
  VALUES
  ('Retro Toaster', 'a toaster for all your bread needs', 70, FALSE, 'https://images.unsplash.com/photo-1624209190904-aca680ededc1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=793&q=80', 1, 1, FALSE),

  ('sunBeam', 'toaster', 80, FALSE, 'https://www.timstoasters.com/wp-content/uploads/elementor/thumbs/T-40-Vista-Pic-1-oxlah1b8pz4rglekmuzj71wcidv10rxli206077zwo.jpg', 1, 1, FALSE),

  ('peace Toaster', 'peace sign toaster', 50, FALSE, 'https://cdn.shopify.com/s/files/1/2100/7939/t/16/assets/Peace-Sign-Toaster1.jpg?v=7416471242838776581', 1, 1, TRUE),

  ('santa monica', 'vintage record player', 100, false, 'https://images.unsplash.com/photo-1526394931762-90052e97b376?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80', 2, 2, FALSE),

  ('crosley', 'record player', 120, FALSE, 'https://images.unsplash.com/photo-1616714107834-a00f7d6f8d72?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80', 2,2, FALSE),

  ('Golden', 'golden record player', 200, TRUE, 'https://images.unsplash.com/photo-1518893883800-45cd0954574b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=734&q=80', 2,2, false),

  ('olypus', 'vintage camera', 300, FALSE, 'https://images.unsplash.com/photo-1601854266103-c1dd42130633?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80', 3,3, True),

  ('canon', 'oldschool camera', 500, True, 'https://images.unsplash.com/photo-1497008323932-4f726e0f13f5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=880&q=80', 3,3, false),

  ('lubitel', 'oldfootage camera', 550, false, 'https://images.unsplash.com/photo-1605858449475-b75c0578f316?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=735&q=80', 3,3, false),

  ('mustang', 'this is that vintage horse', 1000, true, 'https://images.unsplash.com/photo-1544896478-d5b709d413c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', 1,4, false),

  ('Dusk', 'super oldschool car', 1200, false, 'https://images.unsplash.com/photo-1587750059638-e7e8c43b99fc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1169&q=80', 1,4, false),

  ('volkswagen', 'old orange paradise', 1500, false, 'https://images.unsplash.com/photo-1503650923300-dd2f6a007eaf?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1171&q=80', 1,4, true),

  ('Nike air force', 'retro whites', 800, false, 'https://images.unsplash.com/photo-1596480002902-cfc644529d1f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=735&q=80', 2, 5, false),

  ('11s', 'win like 96', 900, true, 'https://images.unsplash.com/photo-1581068503354-ac305d7cc399?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80', 2, 5, false),

  ('Adidas', 'joggers', 500, false, 'https://images.unsplash.com/photo-1581327390677-215ca3876368?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1244&q=80', 2,5, false),

  ('Red Dragon', 'travel back in time and send a love message', 400, false, 'https://images.unsplash.com/photo-1525453689870-bfab0d1af50d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80', 3,6, false),

  ('Olivetti', 'typewriter', 420, false, 'https://images.unsplash.com/photo-1558009250-d3d2229fdf28?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80', 3,6, false),

  ('Trumph', 'typewiter', 410, false, 'https://images.unsplash.com/photo-1524668951403-d44b28200ce0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80', 3,6, false);

