-- CREATE DATABASE examplemicroservicedb;
-- CREATE SCHEMA examplemicroservicedb;
-- SET search_path TO examplemicroservicedb,public;
-- CREATE TABLE examplemicroservicedb.prescription (
--     prescription_id int,
--     user_id int,
--     prescription_stock varchar(8),
--     prescription_quantity int,
--     datetime_created timestamp,
--     datetime_updated timestamp,
--     primary key(prescription_id)
-- );
-- ALTER TABLE examplemicroservicedb.prescription replica identity FULL;

-- U
-- update examplemicroservicedb.prescription set prescription_quantity = 100 where prescription_id=1000;

-- D
-- delete from examplemicroservicedb.prescription where user_id = 3;
-- delete from examplemicroservicedb.prescription where user_id = 2;

-- C
-- insert into examplemicroservicedb.prescription values (1003, 3, 'VTSAX', 100, now(), now());
-- insert into examplemicroservicedb.prescription values (1000, 1, 'VFIAX', 10, now(), now());
-- insert into examplemicroservicedb.prescription values (1001, 2, 'SP500', 1, now(), now());
-- insert into examplemicroservicedb.prescription values (1002, 3, 'SP500', 1, now(), now());
