module.exports= function makeGetOrders({orderDb}) {
  return async function getOrders({userId}) {
    return await orderDb.getOrders({userId});
  }
};