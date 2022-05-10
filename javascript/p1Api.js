const axios = require('axios');

async function userEmailLookup(axiosInstance, scimEmailFilter) {
    try{
        const {data} = await axiosInstance.get(`/users?filter=${scimEmailFilter}`,
          {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return data;
    }
    catch (error) {
        return error;
    }
}

async function createGatewayUser(axiosInstance, userBody) {
    try{
        const {data} = await axiosInstance.post(`/users`, userBody,
          {
            headers: {
                'Content-Type': 'application/vnd.pingidentity.user.import+json',
            }
        });
        return data;
    }
    catch (error) {
        return error;
    }
}

module.exports = {
  userEmailLookup,
  createGatewayUser
}
