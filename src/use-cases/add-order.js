module.exports= function makeAddOrder({orderDb, subscriptionDb, webPush}) {
  return async function addOrder({postData}) {
    const { userId } = postData;
    const orderData = await orderDb.addOrder({postData});
    const orderStatus = ["Accepted", "Preparing", "ReadyToDeliver", "Delivered"];

    webPush.setVapidDetails('mailto:darshan.vesatiya@rapidops.com',
      'BA4KEhAQHmniaFUR7cfOq7A8QHWcjDE1qf-G1p2tJHoPwjFibkA0sHUcn0Vm3N1zppU8mqhDnFS_dKJF69nLFeo',
      'GbrU11uwhYlAJe_CGeWQKjqSunQFTbb4phwbsJzDZBY'
    );
    
    const subData = await subscriptionDb.getSubscription({userId});
    if (!subData) {
      return orderData; 
    }

    const pushConfig = {
      endpoint: subData['endpoint'],
      keys: {
        p256dh: subData['keys']['p256dh'],
        auth: subData['keys']['auth']
      }
    };

    orderStatus.map((status, index) => {
      setTimeout(async () => {
        await orderDb.updateOrderStatus({
          orderId: orderData,
          status: status
        });

        try {
          webPush.sendNotification(pushConfig, JSON.stringify({
            title: `Order Status`,
            content: `Order is ${status}!`,
            openUrl: `/${userId}/order-list`
          }));
        } catch (err) {
          console.info(err);
        }
      }, 1000 * 60 * index);
    });
  }
};