const p1Api = require('./p1Api');
const _ = require('lodash');

const { userEmailLookup , createGatewayUser } = p1Api;

async function matchUserbyEmail(axiosInstance, userEmail) {
    const scimEmailFilter = `email eq "${userEmail}"`;
    const data = await userEmailLookup(axiosInstance, scimEmailFilter);
    return (data.count !== 0 );
}

async function createGatewayUserIfNoMatches(axiosInstance, userBody) {
    const matchedUser = await matchUserbyEmail(axiosInstance, userBody.email);
    if (!matchedUser){
        console.log("No pre-existing user matched. Creating new user.");
        await createGatewayUser(axiosInstance, userBody);
    }
    else {
        console.log("Pre-existing user matched (or other problem occurred). New user creation skipped.");
    }
}

function buildUserCreateBody (username, userEmail, populationID, gatewayID, userTypeID) {
    const userBody = {
        "email": `${userEmail}`,
        "username": `${username}`,
    };
    _.set(userBody, 'population', {id: populationID});

    const gateway = {
        "gateway": {
            "id": `${gatewayID}`,
            "userType": {
                "id": `${userTypeID}`
            },
            "correlationAttributes": {
                "uid": `${username}`,
            }
        }
    };
    _.set(userBody, 'password', {external: gateway});
    return userBody;
}

module.exports = {
    createGatewayUserIfNoMatches,
    buildUserCreateBody
  }
  
