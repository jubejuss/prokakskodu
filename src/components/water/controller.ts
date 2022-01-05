import { Request, Response } from 'express';
import responseCodes from '../general/responseCodes';
import waterService from './service';

const waterController = {
  getAllWater: async (req: Request, res: Response) => {
    const water = await waterService.getAllWater();
    return res.status(responseCodes.ok).json({
      water,
    });
  },
};

export default waterController;
