module.exports= function makeUpdateOrderStatus({orderDb}) {
  return async function updateOrderStatus({orderId, status}) {
    return await orderDb.updateOrderStatus({orderId, status});
  }
};