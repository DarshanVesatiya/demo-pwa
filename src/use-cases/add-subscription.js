module.exports = function makeAddSubscription({subscriptionDb}) {
  return async function addSubscription({postData}) {
    return await subscriptionDb.addSubscription({postData});
  }
};