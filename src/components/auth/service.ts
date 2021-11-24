import usersService from '../users/service';
import hashService from '../general/services/hashService'

const loginService = {
    login: async (email: string, password: string) => {
        const user = usersService.getUserByEmail(email);
        if (!user) return false;
        const match = await hashService.match(password, user.password);
        return match;

    }
};

export default loginService;