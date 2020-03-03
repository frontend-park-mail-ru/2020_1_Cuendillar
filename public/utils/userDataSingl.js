import {getRandomAvatarPath} from "../view/createProfile.js";

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
        token2: "",
    };

}

export default  new UserDataCl();