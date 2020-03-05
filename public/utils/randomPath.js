import {serverLocate} from './constants.js';

/**
 *  get random url for download avatar
 *
 * @param {int} randomPartLength - length of randomPart
 * @return {string}
 */
export function getRandomAvatarPath(randomPartLength = 20) {
  let random = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for ( let i = 0; i < randomPartLength; i++ ) {
    random += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return serverLocate + '/getAvatar' + random;
}
