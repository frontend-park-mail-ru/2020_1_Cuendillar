
export class FetchModule {

    static fetchRequest({url,
                            method = 'post',
                            body = null,
                            headers = {
                                "Content-type": "application/json; charset=UTF-8"
                            }
    } = {}){

        const jsonData = JSON.stringify(body); // add err check

        const options = {
            method: method,
            credentials: 'include',
            headers: headers,
            mode: 'cors',
            body: jsonData
        };
        return fetch(url, options);
    };


    }
