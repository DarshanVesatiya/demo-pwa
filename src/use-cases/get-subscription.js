module.exports= function makeGetSubscription({subscriptionDb}) {
  return async function getSubscription({userId}) {
    return await subscriptionDb.getSubscription({userId});
  }
};