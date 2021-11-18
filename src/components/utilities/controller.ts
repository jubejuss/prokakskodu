import { Request, Response } from 'express';
import responseCodes from '../general/responseCodes';
import utilitiesService from './service';

const utilitiesController = {
  getAllUtilities: (req: Request, res: Response) => {
    const utilities = utilitiesService.getAllUtilities();
    return res.status(responseCodes.ok).json({
      utilities,
    });
  },
  getUtilityById: (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: 'No valid id provided',
      });
    }
    const utility = utilitiesService.getUtilityById(id);
    if (!utility) {
      return res.status(responseCodes.badRequest).json({
        error: `No utlility found with id: ${id}`,
      });
    }
    return res.status(responseCodes.ok).json({
      utility,
    });
  },
  removeUtility: (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: 'No valid id provided',
      });
    }
    const utlility = utilitiesService.getUtilityById(id);
    if (!utlility) {
      return res.status(responseCodes.badRequest).json({
        message: `Utility not found with id: ${id}`,
      });
    }
    utilitiesService.removeUtility(id);
    return res.status(responseCodes.noContent).json({});
  },
  createUtility: (req: Request, res: Response) => {
    const { name, email, phone, IBAN } = req.body;
    if (!name) {
      return res.status(responseCodes.badRequest).json({
        error: 'Name is required',
      });
    }
    if (!email) {
      return res.status(responseCodes.badRequest).json({
        error: 'Email is required',
      });
    }
    if (!phone) {
      return res.status(responseCodes.badRequest).json({
        error: 'Phone is required',
      });
    }
    if (!IBAN) {
      return res.status(responseCodes.badRequest).json({
        error: 'IBAN is required',
      });
    }
    const id = utilitiesService.createUtility(name, email, phone, IBAN);
    return res.status(responseCodes.created).json({
      id,
    });
  },
  updateUtility: (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    const { name, email, phone, IBAN } = req.body;
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: 'No valid id provided',
      });
    }
    if (!name) {
      return res.status(responseCodes.badRequest).json({
        error: 'Nothing to update',
      });
    }
    const utility = utilitiesService.getUtilityById(id);
    if (!utility) {
      return res.status(responseCodes.badRequest).json({
        error: `No utlility found with id: ${id}`,
      });
    }
    utilitiesService.updateUtility({ id, name, email, phone, IBAN });
    return res.status(responseCodes.noContent).json({});
  },
};

export default utilitiesController;
