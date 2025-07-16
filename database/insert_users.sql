USE ecommerce_db;

INSERT INTO users (username, email, password, role) VALUES
('alice01', 'alice01@example.com', 'password123', 'customer'),
('bob_admin', 'bob.admin@example.com', 'adminpass', 'admin'),
('charlie', 'charlie@example.com', 'charliepass', 'customer'),
('diana', 'diana@example.com', 'diana123', 'customer'),
('eve_admin', 'eve.admin@example.com', 'eveadmin', 'admin'),
('frank', 'frank@example.com', 'frankpass', 'customer'),
('grace', 'grace@example.com', 'gracepass', 'customer'),
('henry', 'henry@example.com', 'henrypass', 'customer'),
('irene_admin', 'irene.admin@example.com', 'ireneadmin', 'admin'),
('jack', 'jack@example.com', 'jackpass', 'customer');
