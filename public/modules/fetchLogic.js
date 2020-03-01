
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

    static fetchRequestSendAvatar({url,
                            method = 'post',
                            body = null,
                        } = {}){
        const options = {
            method: method,
            credentials: 'include',
            mode: 'cors',
            body: body
        };
        return fetch(url, options);
    };


    static fetchRequestGetAvatarFromServer({url,
                                      method = 'post',
                                  } = {}){
        const options = {
            method: method,
            credentials: 'include',
            mode: 'cors',
            body: null
        };
        return fetch(url, options);
    };





    }
