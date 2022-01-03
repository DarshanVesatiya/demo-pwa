module.exports= function makeAddUser({userDb}) {
  return async function addUser({postData}) {
    const { mobileNumber, ...userDetails } = postData;
    return await userDb.addUser({mobileNumber, userDetails});
  }
};