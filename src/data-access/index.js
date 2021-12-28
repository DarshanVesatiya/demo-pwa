const config = require('../config/environments');
const { getUserModel, getItemModel, getOrderModel } = require('./models');

// Setup MySQL
const mysql = require('mysql2');

// Create connection pool with MySQL Proxy
const proxyPool = mysql.createPool({
  host: config.mysql.host,
  port: config.mysql.port,
  user: config.mysql.username,
  password: config.mysql.password,
  waitForConnections: true,
  connectionLimit: config.mysql.poolSize
});
const proxyConnectionPool = proxyPool.promise();

// Create connection pool with MySQL Master DB
const masterPool = mysql.createPool({
  host: config.mysql.hostForReadWrite,
  port: config.mysql.portForReadWrite,
  user: config.mysql.username,
  password: config.mysql.password,
  waitForConnections: true,
  connectionLimit: config.mysql.poolSize
});
const masterConnectionPool = masterPool.promise();

// This function will return the connection to MySQL proxy for DB of given host
getProxyNodeConnection = async (hostname) => {
    const connection = await proxyConnectionPool.getConnection();
    await connection.changeUser({
      database: hostname ? hostname.replace(/\./g, '_') : hostname.replace(/\./g, '_')
    });
    return connection;
};

// This function will return the connection to MySQL Master for DB of given host
getMasterNodeConnection = async (hostname) => {
  const connection = await masterConnectionPool.getConnection();
  await connection.changeUser({
    database: hostname ? hostname.replace(/\./g, '_') : hostname.replace(/\./g, '_')
  });
  return connection;
};

// Create connection pool for Cockroach DB
const PgPool = require('pg').Pool;
let cockroachConfig = {
  user: config.cockroach.username,
  host: config.cockroach.host,
  database: config.cockroach.dbName,
  password: config.cockroach.password,
  port: config.cockroach.port,
  max: config.cockroach.poolSize
};
if(config.cockroach.ssl){
  cockroachConfig.ssl = {
    ca: fs.readFileSync('/cockroach-certs/ca.crt')
      .toString(),
    key: fs.readFileSync('/cockroach-certs/client.root.key')
      .toString(),
    cert: fs.readFileSync('/cockroach-certs/client.root.crt')
      .toString()
  };
}
const cockroachPool = new PgPool(cockroachConfig);

// Function to get the connection to cockroach DB
getCockroachDBConnection = async function(dbName) {
  const connection = await cockroachPool.connect();
  await connection.query(`USE ${dbName?dbName:config.cockroach.dbName}`);
  return connection;
};

// Make all DBs here
const makeSampleDb=require('./sampledb');
const sampleDb = makeSampleDb({ getProxyNodeConnection,getMasterNodeConnection, getCockroachDBConnection });

const makeUserDb = require('./user.db');
const userDb = makeUserDb({getUserModel});

const makeItemDb = require('./item.db');
const itemDb = makeItemDb({getItemModel});

const makeOrderDb = require('./order.db');
const orderDb = makeOrderDb({getOrderModel});

// Export all DBs
const dbs={sampleDb, userDb, itemDb, orderDb};
module.exports={getProxyNodeConnection,getMasterNodeConnection,getCockroachDBConnection,...dbs};
