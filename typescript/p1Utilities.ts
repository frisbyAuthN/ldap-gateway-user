import { AxiosInstance } from 'axios';
import p1Api from './p1Api';

const { userEmailLookup , createGatewayUser } = p1Api;

async function matchUserbyEmail(axiosInstance: AxiosInstance, userEmail: string) {
    const scimEmailFilter = `email eq "${userEmail}"`;
    const data = await userEmailLookup(axiosInstance, scimEmailFilter);
    return (data.count !== 0 );
}

async function createGatewayUserIfNoMatches(axiosInstance: AxiosInstance, userBody: UserBody) {
    const matchedUser = await matchUserbyEmail(axiosInstance, userBody.email);
    if (!matchedUser){
        console.log("No pre-existing user matched. Creating new user.");
        await createGatewayUser(axiosInstance, JSON.stringify(userBody));
    }
    else {
        console.log("Pre-existing user matched (or other problem occurred). New user creation skipped.");
    }
}

class UserBody  {
    email: string;
    population: {
        id: string;
    };
    username: string;
    password: {
        external: {
            gateway: {
                id: string;
                userType: {
                    id: string;
                };
                correlationAttributes: {
                    uid: string;
                };
            };
        };
    };

    constructor( username: string, userEmail: string, populationID: string, gatewayID: string, userTypeID: string) {
            this.email = userEmail;
            this.username = username;
            this.population = {
                id: populationID
            };
            const gateway = {
                id: gatewayID,
                userType: {
                    id: userTypeID
                },
                correlationAttributes: {
                    uid: username
                }
            };
            this.password = {
                external: {gateway}
             };
        }
}
    

export = {
    createGatewayUserIfNoMatches,
    UserBody
  }
