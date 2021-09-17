
### Step 1: run container Kafka, Postgres, Zookepper, Debezium Connect
In Tab 1
```
docker-compose up -d
```

### Step 2: Create Sample Database
In Tab 1
```
pgcli -h localhost -p 5432 -U postgres
# password: postgres
CREATE SCHEMA exampledb;
CREATE TABLE exampledb.prescription (
    prescription_id int,
    user_id int,
    prescription_stock varchar(8),
    prescription_quantity int,
    datetime_created timestamp,
    datetime_updated timestamp,
    primary key(prescription_id)
);
```

### Step 3: Call API to Debezium Connect container to watch your database
In Tab 2
```
curl -i -X POST -H "Accept:application/json" -H "Content-Type:application/json" localhost:8083/connectors -d '{"name": "example-conector", "config": {"connector.class": "io.debezium.connector.postgresql.PostgresConnector", "database.hostname": "postgres", "database.port": "5432", "database.user": "postgres", "database.password": "postgres", "database.dbname" : "postgres", "database.server.name": "exampleserver1", "table.whitelist": "exampledb.prescription"}}'
```
Pretier Format header
```
{
  "name": "example-conector",
  "config": {
    "connector.class": "io.debezium.connector.postgresql.PostgresConnector",
    "database.hostname": "postgres",
    "database.port": "5432",
    "database.user": "postgres",
    "database.password": "postgres",
    "database.dbname": "postgres",
    "database.server.name": "exampleserver1",
    "table.whitelist": "exampledb.prescription"
  }
}
```
Success response output
```
{
  "name": "example-conector",
  "config": {
    "connector.class": "io.debezium.connector.postgresql.PostgresConnector",
    "database.hostname": "postgres",
    "database.port": "5432",
    "database.user": "postgres",
    "database.password": "postgres",
    "database.dbname": "postgres",
    "database.server.name": "exampleserver1",
    "table.whitelist": "exampledb.prescription",
    "name": "example-conector"
  },
  "tasks": [],
  "type": "source"
}
```

### Step 4 Consummer message from topic
In Tab 2
```
docker-compose exec kafka /kafka/bin/kafka-console-consumer.sh --bootstrap-server kafka:9092 --from-beginning --property print.key=true --topic exampleserver1.exampledb.prescription
```

### Step 5 Verify
When connect to posgres and interact with DB
```
pgcli -h localhost -p 5432 -U postgres

-- U
-- update exampledb.prescription set prescription_quantity = 100 where prescription_id=1000;

-- D
-- delete from exampledb.prescription where user_id = 3;
-- delete from exampledb.prescription where user_id = 2;

-- C
-- insert into exampledb.prescription values (1000, 1, 'VFIAX', 10, now(), now());
-- insert into exampledb.prescription values (1001, 2, 'SP500', 1, now(), now());
-- insert into exampledb.prescription values (1002, 3, 'SP500', 1, now(), now());
-- insert into exampledb.prescription values (1004, 4, 'VTSAX', 100, now(), now());
```

Then Json data of change db will appear in Tab 2
