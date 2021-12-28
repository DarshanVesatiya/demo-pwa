function makeUserDb({getUserModel}) {
  return Object.freeze({
    getUser,
    addUser
  });

  async function getUser({mobileNumber}) {
    return await getUserModel().findOne({mobileNumber}).lean().exec();
  }

  async function addUser({postData}) {
    const UserModel = getUserModel();
    return await UserModel(postData).save();
  }
}

module.exports = makeUserDb;
