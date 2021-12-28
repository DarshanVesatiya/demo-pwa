function makeItemDb({getItemModel}) {
  return Object.freeze({
    getItems
  });

  async function getItems() {
    return await getItemModel().find().lean().exec();
  }
}

module.exports = makeItemDb;
