-- Sample carts for users 13-17
INSERT INTO carts (user_id) VALUES (13), (14), (15), (16), (17);

-- Sample cart_items (cart_id, product_id, quantity)
INSERT INTO cart_items (cart_id, product_id, quantity) VALUES
(1, 1, 2),
(1, 3, 1),
(2, 2, 1),
(2, 4, 2),
(3, 5, 1),
(4, 1, 1),
(4, 2, 1),
(4, 3, 1),
(5, 4, 2);

-- Sample orders for users 18-22
INSERT INTO orders (user_id, status, total) VALUES
(18, 'pending', 1399.98),
(19, 'shipped', 199.99),
(20, 'delivered', 249.99),
(21, 'pending', 1289.98),
(22, 'cancelled', 89.99);

-- Sample order_items (order_id, product_id, quantity, price)
INSERT INTO order_items (order_id, product_id, quantity, price) VALUES
(1, 1, 2, 699.99),
(2, 3, 1, 199.99),
(3, 4, 1, 249.99),
(4, 2, 1, 1199.99),
(4, 5, 1, 89.99),
(5, 5, 1, 89.99);
