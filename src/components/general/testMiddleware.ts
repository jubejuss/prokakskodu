import { Request, Response, NextFunction } from 'express';

const middler = (req: Request, res: Response, next: NextFunction) => {
  console.dir(req.protocol === 'https');
  next();
};

export default middler;
