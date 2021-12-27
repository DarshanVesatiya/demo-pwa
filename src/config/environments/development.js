const config={
  mysql:{
    host:'127.0.0.1',
    hostForWebhook:'127.0.0.1',
    hostForReadWrite:'127.0.0.1',
    port:'3306',
    portForReadWrite:'3306',
    name:'newlocal_mysoulcrm_com',
    username:'root',
    password:'root',
    poolSize:10, //jshint ignore: line
    debug:false,
    dbBackupEncryptionSecret:'eThAmZq4t2w!z%C*M-JaNdRfQjXn2r9u\n'
  },
  cockroach:{
    host:'10.0.1.75',
    port: 26257,
    dbName:'salesmate_dev',
    dbNameForStats :'salesmate_dev_stats',
    username:'root',
    password:'',
    poolSize:10
  },
  kafka:{
    host:'10.211.55.3',
    port:9092
  },
  loggingOptions:{
    'console':{
      enabled:true
    }
  },
  mongo: {
    hosts: [
      'localhost:27017',
    ],
    database: 'demo-pwa',
    username: '',
    password: '',
    debug: true,
    replicaSet: '',
    server: {
      auto_reconnect: true,
      poolSize: 10,
      socketOptions: {
        keepAlive: 1,
      },
    },
  },
};
module.exports={config};
