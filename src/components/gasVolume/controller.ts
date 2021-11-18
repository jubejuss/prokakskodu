import { Request, Response } from 'express';
import responseCodes from '../general/responseCodes';
import gasVolumesService from './service';

const gasVolumesController = {
  getAllVolumes: (req: Request, res: Response) => {
    const volumes = gasVolumesService.getAllVolumes();
    return res.status(responseCodes.ok).json({
      volumes,
    });
  },
  getVolumeById: (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: 'No valid id provided',
      });
    }
    const volume = gasVolumesService.getVolumeById(id);
    if (!volume) {
      return res.status(responseCodes.badRequest).json({
        error: `No utlility found with id: ${id}`,
      });
    }
    return res.status(responseCodes.ok).json({
      volume,
    });
  },
  createVolume: (req: Request, res: Response) => {
    const { utilityId, pricePerM, year, month, amount } = req.body;
    if (!utilityId) {
      return res.status(responseCodes.badRequest).json({
        error: 'Utility id is required',
      });
    }
    if (!year) {
      return res.status(responseCodes.badRequest).json({
        error: 'Year is required',
      });
    }
    if (!month) {
      return res.status(responseCodes.badRequest).json({
        error: 'Month is required',
      });
    }
    if (!amount) {
      return res.status(responseCodes.badRequest).json({
        error: 'Amount is required',
      });
    }
    const id = gasVolumesService.createVolume(
      utilityId,
      pricePerM,
      year,
      month,
      amount
    );
    return res.status(responseCodes.created).json({
      id,
    });
  },
  updateVolume: (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    const { utilityId, pricePerM, year, month, amount } = req.body;
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: 'No valid id provided',
      });
    }
    if (!year) {
      return res.status(responseCodes.badRequest).json({
        error: 'Nothing to update',
      });
    }
    const volume = gasVolumesService.getVolumeById(id);
    if (!volume) {
      return res.status(responseCodes.badRequest).json({
        error: `No utlility found with id: ${id}`,
      });
    }
    gasVolumesService.updateVolume({
      id,
      utilityId,
      pricePerM,
      year,
      month,
      amount,
    });
    return res.status(responseCodes.noContent).json({});
  },
};

export default gasVolumesController;
