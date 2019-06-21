import BaseURL from './BaseURL';
import { getFromAsync, removeFromAsync } from './AsyncService';

console.log('BaseURL', BaseURL);

const getData = async (url) => {
    console.log(url)
    try {
        const token = await getFromAsync("token");
        console.log('token', token);
        const response = await fetch(`${BaseURL}/${url}`, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            // credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                'auth': token,
            },
        });
        const result = await response.json();
        console.log('result.status', result);
        if(result && result.status == 401) {
            alert("Please restart app again");
            await removeFromAsync("store");
            await removeFromAsync("token");
            return null;
        }
        else {
            return result;
        }
    } catch (e) {
        console.log(url, e)
    }
}

const postData = async (url, body) => {
    console.log(url, body);
    try {
        const token = await getFromAsync("token");
        console.log('token', token);
        const response = await fetch(`${BaseURL}/${url}`, {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json; charset=utf-8",
              'auth': token,
            },
            body: JSON.stringify(body)
          });
          const result = await response.json();
          return result;
    } catch (e) {
        console.log(url, e)
    }
}

export { getData, postData };