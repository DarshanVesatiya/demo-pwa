function makeUserDb({getUserModel}) {
  return Object.freeze({
    getUser,
    addUser
  });

  async function getUser({mobileNumber}) {
    return await getUserModel().findOne({mobileNumber}).lean().exec();
  }

  // async function addUser({postData}) {
  //   const UserModel = getUserModel();
  //   return await UserModel(postData).save();
  // }

  async function addUser({mobileNumber, userDetails}) {
    return await getUserModel().findOneAndUpdate({mobileNumber},
      { $set: { ...userDetails }},
      { upsert: true, returnNewDocument: true });
  }
}

module.exports = makeUserDb;
