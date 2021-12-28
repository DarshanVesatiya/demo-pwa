module.exports= function makeGetItems({itemDb}) {
  return async function getItems() {
    return await itemDb.getItems();
  }
};