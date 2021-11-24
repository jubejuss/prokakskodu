import { Request, Response, NextFunction } from 'express';
import responseCodes from '../general/responseCodes';

const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];
  if (!token) {
    return res.status(responseCodes.notAuthorized).json({
      error: 'No token provided',
    });
  }
  console.log(token);
  return next();
};
export default isLoggedIn;
