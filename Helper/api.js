const Global = require('../Helper/Constants');
// import * as SecureStore from 'expo-secure-store';


function isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

function getHeader(method, data, token){
    let header = {
        method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    };
    if(token){
        header.headers['Authorization'] = token
    }
    if(!isEmpty(data)){
        header['body'] = JSON.stringify(data)
    }
    console.log(data)
    console.log(header)
    return header
}

export default {
    getData: (url, token) => {
        console.log(Global.BASE_URL + url)
        return fetch(Global.BASE_URL + url, getHeader('GET', {}, token))
            .then((response) => {
                const statusCode = response.status;
                const data = response.json();
                console.log(data)
                return Promise.all([statusCode, data]);
            })

            .catch((error) => {
                console.error(error);

            });
    },
    postData: (url, data, token = '') => {
        return fetch(Global.BASE_URL + url, getHeader('POST', data, token))
            .then((response) => {
                const statusCode = response.status;
                const data = response.json();
                return Promise.all([statusCode, data]);
            })

            .catch((error) => {
                console.error(error);

            });
    },
    getFitbitData: (url, token) => {
        console.log(url)
        return fetch(url, getHeader('GET', {}, token))
            .then((response) => {
                const statusCode = response.status;
                const data = response.json();
                return Promise.all([statusCode, data]);
            })

            .catch((error) => {
                console.error(error);

            });
    }
}

