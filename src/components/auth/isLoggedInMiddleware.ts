import { Request, Response, NextFunction } from 'express';
import jwtService from '../general/services/jwtService';
import responseCodes from '../general/responseCodes';

const isLoggedIn = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];
  if (!token) {
    return res.status(responseCodes.notAuthorized).json({
      error: 'No token provided',
    });
  }
  const payload = await jwtService.verify(token);
  if (!payload) {
    return res.status(responseCodes.notAuthorized).json({
      error: 'invalid token',
    });
  }
  res.locals.user = payload;
  console.log(payload);
  return next();
};

export default isLoggedIn;
