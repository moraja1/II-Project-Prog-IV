INSERT INTO `projectii`.`user` (`natural_id`, `password`, `name`, `last_name`, `mobile`, `email`, `enabled`, `type`)
VALUES ('202220222', 'oW0kAA91qF', 'Dana', 'Lisett', '9636350406', 'dlisett0@intel.com', true, 'Physical');
INSERT INTO `projectii`.`user` (`natural_id`, `password`, `name`, `last_name`, `mobile`, `email`, `enabled`, `type`)
VALUES ('303330333', 'mS4FW5H&iV#1Q(', 'Bradney', 'Enefer', '5083053497', 'benefer1@yelp.com', false, 'Physical');
INSERT INTO `projectii`.`user` (`natural_id`, `password`, `name`, `last_name`, `mobile`, `email`, `enabled`, `type`)
VALUES ('404440444', 'aU6L3Lc', 'Minni', 'Lepiscopio', '6203604625', 'mlepiscopio2@usa.gov', true, 'Physical');
INSERT INTO `projectii`.`user` (`natural_id`, `password`, `name`, `last_name`, `mobile`, `email`, `enabled`, `type`)
VALUES ('505550555', 'fsgdfhsh', 'Maggie', 'Trabikta', '2566633154', 'Trabikta@co.gov', false, 'Juridical');
INSERT INTO `projectii`.`user` (`natural_id`, `password`, `name`, `last_name`, `mobile`, `email`, `enabled`, `type`)
VALUES ('606660666', 'errtutuiy', 'Maritza', 'Estupiñam', '25666333211', 'Estipikddss@ibm.corp', false, 'Physical');
INSERT INTO `projectii`.`user` (`natural_id`, `password`, `name`, `last_name`, `mobile`, `email`, `enabled`, `type`)
VALUES ('707770777', 'bvnbcaerte', 'Crampble', 'Gladiatore', '9996654984', 'Gfjhdfbsa@yahoo.es', true, 'Physical');


-- MEASURE UNITS --
INSERT INTO projectii.measure_units (id_measure_units, name, symbol) VALUES (1, 'gramo', 'g');
INSERT INTO projectii.measure_units (id_measure_units, name, symbol) VALUES (2, 'Kilogramo', 'Kg');
INSERT INTO projectii.measure_units (id_measure_units, name, symbol) VALUES (3, 'mililitro', 'ml');
INSERT INTO projectii.measure_units (id_measure_units, name, symbol) VALUES (4, 'Litro', 'L');
INSERT INTO projectii.measure_units (id_measure_units, name, symbol) VALUES (5, 'milimetro', 'mm');
INSERT INTO projectii.measure_units (id_measure_units, name, symbol) VALUES (6, 'Metro', 'M');
INSERT INTO projectii.measure_units (id_measure_units, name, symbol) VALUES (7, 'Unidades', 'u');


-- ADMIN ROLE --
insert into user_roles (role_id, user_id)
values ();