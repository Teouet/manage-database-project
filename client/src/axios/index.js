import axios from "axios";
import Config from "../config";

const callApi = ({ method, params, url, data, checkAuth, token }) => {
    return new Promise((resolve, reject) => {
        axios({
            method: method ? method : "post",
            params: params ? params : null,
            baseURL: Config.BASE_URL,
            url: url,
            data: data ? data : null,
            headers: checkAuth ? {
                'Authorization': `Bearer ${token}`
            } : null
        })
            .then(response => {
                if (response.status === 200) {
                    resolve(response.data);
                }
                else {
                    reject("failed");
                }
            }).catch(e => {
                reject(e);
            });
    })
}
export { callApi }