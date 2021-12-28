module.exports= function makeGetUser({userDb}) {
  return async function getUser({mobileNumber}) {
    return await userDb.getUser({mobileNumber});
  }
};