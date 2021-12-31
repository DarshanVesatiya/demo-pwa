function makeSubscriptionDb({getSubscriptionModel}) {
  return Object.freeze({
    addSubscription,
    getSubscription
  });

  async function addSubscription({postData}) {
    const SubscriptionModel = getSubscriptionModel();
    return await SubscriptionModel(postData).save();
  }

  async function getSubscription({userId}) {
    return await getSubscriptionModel().findOne({userId}).lean().exec();
  }
}

module.exports = makeSubscriptionDb;