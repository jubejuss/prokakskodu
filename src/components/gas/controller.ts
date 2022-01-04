import { Request, Response } from 'express';
import responseCodes from '../general/responseCodes';
import gasService from './service';

const gasController = {
  getAllGas: async (req: Request, res: Response) => {
    const gas = await gasService.getAllGas();
    return res.status(responseCodes.ok).json({
      gas,
    });
  },
};

export default gasController;
