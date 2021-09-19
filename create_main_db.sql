CREATE DATABASE exampledb;
CREATE SCHEMA exampledb;
SET search_path TO exampledb,public;
CREATE TABLE exampledb.prescription (
    prescription_id int,
    user_id int,
    prescription_stock varchar(8),
    prescription_quantity int,
    datetime_created timestamp,
    datetime_updated timestamp,
    primary key(prescription_id)
);
ALTER TABLE exampledb.prescription replica identity FULL;

-- U
-- update exampledb.prescription set prescription_quantity = 100 where prescription_id=1000;

-- D
-- delete from exampledb.prescription where user_id = 3;
-- delete from exampledb.prescription where user_id = 2;

-- C
-- insert into exampledb.prescription values (1003, 3, 'VTSAX', 100, now(), now());
-- insert into exampledb.prescription values (1000, 1, 'VFIAX', 10, now(), now());
-- insert into exampledb.prescription values (1001, 2, 'SP500', 1, now(), now());
-- insert into exampledb.prescription values (1002, 3, 'SP500', 1, now(), now());
