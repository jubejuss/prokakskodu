import { Request, Response } from 'express';
import responseCodes from '../general/responseCodes';
import indicatorsService from './service';

const getAllIndicators = async (req: Request, res: Response) => {
  const Indicators = await indicatorsService.getAllIndicators();
  console.log(req);
  return res.status(responseCodes.ok).json({
    Indicators,
  });
};

const getIndicatorsByMonths = async (req: Request, res: Response) => {
  const indicator = await indicatorsService.getIndicatorsByMonths();
  if (!indicator) {
    if (indicator) {
      return res.status(responseCodes.serverError).json({});
    }
  }
  return res.status(responseCodes.ok).json({
    indicator,
  });
};

const indicatorsController = {
  getAllIndicators,
  getIndicatorsByMonths,
};

export default indicatorsController;
