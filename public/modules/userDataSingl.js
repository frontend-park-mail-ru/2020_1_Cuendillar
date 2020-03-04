import {getRandomAvatarPath} from '../utils/randomPath.js'

/**
 *  user data singleton
 *
 */
class UserDataCl {
     Data = {
        id: -1,
        login: "null",
        email: 'email',
        token: "",
        avatarPath: getRandomAvatarPath(),
    };

}

export default  new UserDataCl();