module.exports= function makeAddUser({userDb}) {
  return async function addUser({postData}) {
    const { mobileNumber, ...userDetails } = postData;
    const isUserExist = await userDb.getUser({mobileNumber});
    if (isUserExist) {
      return await userDb.updateUserDetails({mobileNumber, userDetails});
    }
    return await userDb.addUser({postData});
  }
};