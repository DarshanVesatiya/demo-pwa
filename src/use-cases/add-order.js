module.exports= function makeAddOrder({orderDb}) {
  return async function addOrder({postData}) {
    return await orderDb.addOrder({postData});
  }
};