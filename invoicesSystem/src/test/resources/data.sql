-- MEASURE UNITS --
INSERT INTO projectii.measure_units (id_measure_units, name, symbol) VALUES (1, 'gramo', 'g');
INSERT INTO projectii.measure_units (id_measure_units, name, symbol) VALUES (2, 'Kilogramo', 'Kg');
INSERT INTO projectii.measure_units (id_measure_units, name, symbol) VALUES (3, 'mililitro', 'ml');
INSERT INTO projectii.measure_units (id_measure_units, name, symbol) VALUES (4, 'Litro', 'L');
INSERT INTO projectii.measure_units (id_measure_units, name, symbol) VALUES (5, 'milimetro', 'mm');
INSERT INTO projectii.measure_units (id_measure_units, name, symbol) VALUES (6, 'Metro', 'M');
INSERT INTO projectii.measure_units (id_measure_units, name, symbol) VALUES (7, 'Unidad', 'u');

-- ROLES --

insert into roles (name)
values ('ROLE_ADMIN');
insert into roles (name)
values ('ROLE_USER');

-- USER TYPES --

insert into supplier_type (name)
values ('JURIDICAL');
insert into supplier_type (name)
values ('PHYSICAL');
insert into supplier_type (name)
values ('ADMINISTRATIVE');

-- USERS --

insert into user (natural_id, password, name, last_name, mobile, email, enabled,  type_id_supplier_type)
values ('202220222', 'oW0kAA91qF', 'Dana', 'Lisett', '9636350406', 'dlisett0@intel.com', true, 3);
insert into user_roles (id_role, id_user)
values (1, 1);
insert into user (natural_id, password, name, last_name, mobile, email, enabled,  type_id_supplier_type)
values ('303330333', 'mS4FW5H&iV#1Q(', 'Bradney', 'Enefer', '5083053497', 'benefer1@yelp.com', false, 2);
insert into user_roles (id_role, id_user)
values (2, 2);
insert into user (natural_id, password, name, last_name, mobile, email, enabled,  type_id_supplier_type)
values ('404440444', 'aU6L3Lc', 'Minni', 'Lepiscopio', '6203604625', 'mlepiscopio2@usa.gov', true, 2);
insert into user_roles (id_role, id_user)
values (2, 3);
insert into user (natural_id, password, name, last_name, mobile, email, enabled,  type_id_supplier_type)
values ('505550555', 'fsgdfhsh', 'Maggie', 'Trabikta', '2566633154', 'Trabikta@co.gov', false, 1);
insert into user_roles (id_role, id_user)
values (2, 4);
insert into user (natural_id, password, name, last_name, mobile, email, enabled,  type_id_supplier_type)
values ('606660666', 'errtutuiy', 'Maritza', 'Estupiñam', '25666333211', 'Estipikddss@ibm.corp', false, 1);
insert into user_roles (id_role, id_user)
values (2, 5);
insert into user (natural_id, password, name, last_name, mobile, email, enabled,  type_id_supplier_type)
values ('707770777', 'bvnbcaerte', 'Crampble', 'Gladiatore', '9996654984', 'Gfjhdfbsa@yahoo.es', true, 2);
insert into user_roles (id_role, id_user)
values (2, 6);

-- PRODUCTS --

INSERT INTO projectii.products (id_products, code, name, price, measure_units_id_measure_units, user_id_user) VALUES (3, 'PD-001', 'Bola Nike', 4500, 7, 3);
INSERT INTO projectii.products (id_products, code, name, price, measure_units_id_measure_units, user_id_user) VALUES (4, 'PD-001', 'Bola Nike', 4500, 7, 6);
INSERT INTO projectii.products (id_products, code, name, price, measure_units_id_measure_units, user_id_user) VALUES (5, 'PD-002', 'Bola Adidas', 6500, 7, 3);
INSERT INTO projectii.products (id_products, code, name, price, measure_units_id_measure_units, user_id_user) VALUES (6, 'PD-003', 'Proteina', 500, 1, 3);
INSERT INTO projectii.products (id_products, code, name, price, measure_units_id_measure_units, user_id_user) VALUES (7, 'PD-004', 'Bebida energizante', 25, 3, 3);

-- SERVICES --

INSERT INTO projectii.service (id_service, name, price_hour, user_id_user) VALUES (1, 'Arquitectura', 12000, 6);
INSERT INTO projectii.service (id_service, name, price_hour, user_id_user) VALUES (3, 'Mecanico Automotriz', 12000, 6);
INSERT INTO projectii.service (id_service, name, price_hour, user_id_user) VALUES (4, 'Arquitectura', 12000, 3);

-- CLIENTS --
INSERT INTO projectii.client (id_client, email, last_name, mobile, name, natural_id, user_id_user)
VALUES (1, 'keylor@psg.com', 'Navas', '90356045', 'Keylor', '905440633', 3);
INSERT INTO projectii.client (id_client, email, last_name, mobile, name, natural_id, user_id_user)
VALUES (2, 'marta@car.com', 'Escobar', '20444036', 'Marta Emilia', '70588033', 3);
