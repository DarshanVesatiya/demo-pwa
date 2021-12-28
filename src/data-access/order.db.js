function makeOrderDb({getOrderModel}) {
  return Object.freeze({
    getOrders,
    addOrder,
    updateOrderStatus
  });

  async function getOrders({userId}) {
    return await getOrderModel().find({userId}).lean().exec();
  }

  async function addOrder({postData}) {
    const OrderModel = getOrderModel();
    return await OrderModel(postData).save();
  }

  async function updateOrderStatus({orderId, status}) {
    return await getOrderModel().findByIdAndUpdate(orderId,
      {status}, {returnOriginal: false}).lean().exec();
  }
}

module.exports = makeOrderDb;
