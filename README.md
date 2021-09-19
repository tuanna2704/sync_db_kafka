
### Step 1: Prepare Infratructure
```
# Build web app image
docker-compose build

# Provision Infra
docker-compose up --force-recreate -d

# Create Empty DB for microservice
node createmicroservicedb.js

# Register connector to watch DB change and produce message to Kafka
curl -i -X POST -H "Accept:application/json" -H "Content-Type:application/json" localhost:8083/connectors -d '{"name": "example-conector", "config": {"connector.class": "io.debezium.connector.postgresql.PostgresConnector", "database.hostname": "postgres", "database.port": "5432", "database.user": "postgres", "database.password": "postgres", "database.dbname" : "postgres", "database.server.name": "exampleserver1", "table.whitelist": "exampledb.prescription"}}'

```

### Step 2: POC syncDB CDC using Kafka
In Tab 1
```
# Access to Main Database
pgcli -h localhost -p 5432 -U postgres
# password: postgres

```

In Tab 2
```
# Run consummer to consume message from kafka
docker exec -it webapp node consumer.js
```

In Tab 
```
# Run Web application
node index.js
```
### Step 3 Verify
When trigger command to insert to posgres in Tab 1
```
# Example command:
insert into exampledb.prescription values (1000, 1, 'VFIAX', 10, now(), now());
insert into exampledb.prescription values (1001, 2, 'SP500', 1, now(), now());
insert into exampledb.prescription values (1002, 3, 'SP500', 1, now(), now());
insert into exampledb.prescription values (1004, 4, 'VTSAX', 100, now(), now());
```
THEN Debezium will produce message to Kafka with inserted data
THEN Consumer will consume message in insert data to postgres_microservice db
THEN when you access to localhost:4000 you will see data was inserted
