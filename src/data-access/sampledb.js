function makeSampleDb ({getProxyNodeConnection, getMasterNodeConnection ,getCockroachDBConnection}) {
  return Object.freeze({
    findAll
  });
  
  async function findAll({connection,id,hostname}){
    if(!connection){
      connection=await getMasterNodeConnection(hostname);
    }
  }
}

module.exports=makeSampleDb;
