import { Request, Response } from 'express';
import responseCodes from '../general/responseCodes';
import indicatorsService from './service';
import { UpdateIndicator, NewIndicator } from './interfaces';

const indicatorsController = {
  getAllIndicators: async (req: Request, res: Response) => {
    const Indicators = await indicatorsService.getAllIndicators();
    return res.status(responseCodes.ok).json({
      Indicators,
    });
  },
};

export default indicatorsController;
