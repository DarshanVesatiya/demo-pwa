const Mongoose = require('mongoose');

const connections = {};

async function prepareMongooseConnection({mongo, name = 'main'}) {
  if (connections[name] && connections[name].readyState) {
    return connections[name];
  }

  const options = Object.freeze({
    autoIndex: false, // Don't build indexes
    // poolSize: 30, // Maintain up to 10 socket connections
    // bufferMaxEntries: 0,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
    serverSelectionTimeoutMS: 5000,
  });

  Mongoose.set('debug', mongo.debug ? {color: false}: false);

  // const credentials = mongo.username ? `${mongo.username}:${mongo.password}@` : '';
  // const mongoConnectionURI = `mongodb://${credentials}${mongo.hosts}/${mongo.database}?authSource=admin${mongo.replicaSet ? `&replicaSet=${mongo.replicaSet}` : ''}`;
  const mongoConnectionURI = `mongodb://${mongo.hosts}/${mongo.database}`;

  try {
    connections[name] = await Mongoose.createConnection(mongoConnectionURI, options);
  } catch (e) {
    console.error('Failed to connect mongodb');
    console.error(e);
    throw e;
  }
  // eslint-disable-next-line no-console
  console.info(`Worker ${process.pid} connected to Mongo Database - ${mongo.hosts}@${mongo.database}`);
  return connections[name];
}

function getMongooseConnection(name = 'main') {
  if (connections[name] && connections[name].readyState) {
    return connections[name];
  }
  return null;
}

module.exports = {
  getMongooseConnection,
  prepareMongooseConnection,
};
