const Kafka = require('node-rdkafka');
const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres",
  host: "postgres_microservice",
  // database: "examplemicroservicedb",
  password: "postgres",
  port: "5432"
});

var consumer = new Kafka.KafkaConsumer({
  'group.id': 'kafka',
  'metadata.broker.list': 'kafka:9092',
}, {});

consumer.connect();

consumer.on('ready', () => {
  console.log('consumer ready..')
  consumer.subscribe(['exampleserver1.exampledb.prescription']);
  consumer.consume();
}).on('data', function(data) {
  console.log(`Received Message from topic: ${data.topic}`);
  let dataJson = JSON.parse(`${data.value}`);
  console.log(dataJson.payload);
  console.log('----------------');

  if(dataJson.payload.before === null) {
    let { prescription_id, user_id, prescription_stock, prescription_quantity, datetime_created, datetime_updated } = dataJson.payload.after;
    const textInsert = `INSERT INTO prescription(prescription_id, user_id, prescription_stock, prescription_quantity, datetime_created, datetime_updated)VALUES(${prescription_id}, ${user_id}, '${prescription_stock}', ${prescription_quantity}, NOW(), NOW())`;
    console.log('----------');
    console.log(textInsert);
    console.log('----------');
    pool.query(textInsert,
      (err, res) => {
        console.log(err, res);
      }
    );
  }
  
});