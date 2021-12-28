module.exports= function makeAddUser({userDb}) {
  return async function addUser({postData}) {
    return await userDb.addUser({postData});
  }
};