INSERT INTO users (firstName, lastName, email, password, role)
    VALUES
    ('Administraator', 'Adminnipere', 'admin@admin.ee', 'administraator', 'Admin'),
    ('Tava', 'Tavakasutaja', 'tava@tavakasutaja', 'tava', 'User'),
    ('Constantia', 'Scourfield', 'cscourfield0@howstuffworks.com', 'A7N2caE15IVX', 'User'),
	('Jobi', 'Lawrenson', 'jlawrenson1@comsenz.com', 'HrxmWp7A8', 'User');

INSERT INTO users (firstName, lastName, email, password, role)
    VALUES
    ('Maie', 'Paie', 'maie@paie.ee', '$2b$10$QPkywYQSrdFi8Yc2bdSmAuPalMLaiPwkCWfB1ivb4goaJOjJOjowy', 'Admin');

INSERT INTO gas (date, gasPrice)
    VALUES ('2021-01-01', '30'),
    ('2021-12-01', '35');

INSERT INTO water (date, waterPrice)
    VALUES
    ('2021-01-01', '20'),
    ('2021-12-01', '30');

INSERT INTO monthUsage (users_id, month, gasUsage, gasPrice, waterUsage, waterPrice)
    VALUES
    (1,'2021-10-01', '33', (SELECT gasPrice FROM gas WHERE id=(select MAX(id) FROM gas)), '40', (SELECT waterPrice FROM water WHERE id=(select MAX(id) FROM water))),
    (2,'2021-10-01', '30', (SELECT gasPrice FROM gas WHERE id=(select MAX(id) FROM gas)), '45', (SELECT waterPrice FROM water WHERE id=(select MAX(id) FROM water))),
    (3,'2021-10-01', '25', (SELECT gasPrice FROM gas WHERE id=(select MAX(id) FROM gas)), '41', (SELECT waterPrice FROM water WHERE id=(select MAX(id) FROM water))),
    (4,'2021-10-01', '40', (SELECT gasPrice FROM gas WHERE id=(select MAX(id) FROM gas)), '39', (SELECT waterPrice FROM water WHERE id=(select MAX(id) FROM water)));
