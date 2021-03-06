import {default as CurrentUser} from './userDataSingl.js';

/**
 * Реализация транспортной логики
 */
export class FetchModule {
  /**
   * Post request with json
   *
   * @param {string} url - request url
   * @param {map} parameters - parameters for fetch
   * @return {promise}
   */
  static fetchRequest({url,
    method = 'post',
    body = null,
    headers = {
      'Content-type': 'application/json; charset=UTF-8',
    },
  } = {}) {
    const jsonData = JSON.stringify(body); // add err check

    const options = {
      method: method,
      credentials: 'include',
      headers: headers,
      mode: 'cors',
      body: jsonData,
    };
    return fetch(url, options);
  };

  /**
   *  Send avatar to Go server
   *
   * @param {string} url - request url
   * @param {map} parameters - parameters for fetch
   * @return {promise}
   */
  static fetchRequestSendImage({url,
    method = 'post',
    body = null,
  } = {}) {
    const options = {
      method: method,
      credentials: 'include',
      mode: 'cors',
      body: body,
      headers: {'X-Csrf-Token': CurrentUser.Data.token},
    };
    return fetch(url, options);
  };
}
