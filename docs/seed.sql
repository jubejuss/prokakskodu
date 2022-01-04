INSERT INTO users (apartmentNr, firstName, lastName, email, password, role)
    VALUES
    ('1', 'Aino', 'Maino', 'admin@admin.ee', 'administraator', 'User'),
    ('2', 'Tava', 'Tavakasutaja', 'tava@tavakasutaja', 'tava', 'User'),
    ('3', 'Constantia', 'Scourfield', 'cscourfield0@howstuffworks.com', 'A7N2caE15IVX', 'User'),
	('4', 'Jobi', 'Lawrenson', 'jlawrenson1@comsenz.com', 'HrxmWp7A8', 'User');

INSERT INTO users (apartmentNr, firstName, lastName, email, password, role)
    VALUES
    ('10', 'Maie', 'Paie', 'maie@paie.ee', '$2b$10$QPkywYQSrdFi8Yc2bdSmAuPalMLaiPwkCWfB1ivb4goaJOjJOjowy', 'Admin');

INSERT INTO gas (date, gasPrice)
    VALUES ('2021-01-01', '30'),
    ('2021-12-01', '35');

INSERT INTO water (date, waterPrice)
    VALUES
    ('2021-01-01', '20'),
    ('2021-12-01', '30');

INSERT INTO indicators (users_id, month, gasUsage, waterUsage)
    VALUES
    (1,'2021-10-01', '33', '40'),
    (2,'2021-10-01', '30', '45'),
    (3,'2021-10-01', '25', '41'),
    (4,'2021-10-01', '40', '39');
