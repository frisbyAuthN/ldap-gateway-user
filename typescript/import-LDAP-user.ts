import axios from 'axios';
import p1Utilities from './p1Utilities';

const { createGatewayUserIfNoMatches , UserBody } = p1Utilities;

const environmentID = '<id here>';
const populationID = '<id here>';

// Generated for a PingOne worker app from the Admin UI 
// or via https://apidocs.pingidentity.com/pingone/platform/v1/api/#post-token-admin-app-client_credentials 
const accessToken = '<PingOne access token here>';

// Gateway and User Type IDs are not currently exposed via the Admin UI, so they are 
// identified using https://apidocs.pingidentity.com/pingone/platform/v1/api/#get-read-all-gateways
const gatewayID = '<id here>';
const userTypeID = '<id here>';

const pingAxiosInstance = axios.create({
    baseURL: `https://api.pingone.com/v1/environments/${environmentID}/`,
    headers:{
        'Authorization': `Bearer ${accessToken}`,
    },
});

// User details from an on-premise LDAP directory
const username = 'user.189';
const userEmail = `${username}@example.com`;

const userBody = new UserBody(username, userEmail, populationID, gatewayID, userTypeID);
createGatewayUserIfNoMatches(pingAxiosInstance, userBody);