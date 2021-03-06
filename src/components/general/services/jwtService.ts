import jwt from 'jsonwebtoken';
import { IUser } from '../../users/interfaces';

const jwtPassword = 'asjaksjajskask';

const jwtService = {
  sign: async (user: IUser) => {
    const payload = {
      id: user.id,
      role: user.role,
    };
    const token = await jwt.sign(payload, jwtPassword, { expiresIn: '1h' });
    return token;
  },
  verify: async (token: string) => {
    try {
      const verify = await jwt.verify(token, jwtPassword);
      return verify;
    } catch (error) {
      // console.log(error);
      return false;
    }
  },
};

export default jwtService;
