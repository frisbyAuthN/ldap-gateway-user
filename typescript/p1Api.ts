import { AxiosInstance } from 'axios';

async function userEmailLookup(axiosInstance: AxiosInstance, scimEmailFilter: string) {
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

async function createGatewayUser(axiosInstance: AxiosInstance, userBody: string) {
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

export = {
  userEmailLookup,
  createGatewayUser
}
