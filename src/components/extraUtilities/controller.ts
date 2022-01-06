import { Request, Response } from 'express';
import extraUtilitiesService from './service';
import responseCodes from '../general/responseCodes';
import { INewExtraUtility, IUpdateExtraUtility } from './interfaces';

const getAllExtraUtilities = async (req: Request, res: Response) => {
  const extraUtilities = await extraUtilitiesService.getAllExtraUtilities();
  return res.status(responseCodes.ok).json({
    extraUtilities,
  });
};

const getExtraUtilityById = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  if (!id) {
    return res.status(responseCodes.badRequest).json({
      error: 'No valid id provided',
    });
  }
  const extraUtility = await extraUtilitiesService.getExtraUtilityById(id);
  if (!extraUtility) {
    return res.status(responseCodes.badRequest).json({
      error: `No extraUtility found with id: ${id}`,
    });
  }
  return res.status(responseCodes.ok).json({
    extraUtility,
  });
};

const createExtraUtility = async (req: Request, res: Response) => {
  const { name, description, price, amount } = req.body;
  const newExtraUtility: INewExtraUtility = {
    name,
    description,
    price,
    amount,
  };
  const id = await extraUtilitiesService.createExtraUtility(newExtraUtility);
  if (!id) {
    return res.status(responseCodes.serverError).json({});
  }
  return res.status(responseCodes.created).json({
    id,
  });
};

const updateExtraUtility = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  const { name, price, amount, description, dateFrom, dateTo } = req.body;
  if (!name) {
    return res.status(responseCodes.badRequest).json({
      error: 'Nothing to update',
    });
  }
  const extraUtility = await extraUtilitiesService.getExtraUtilityById(id);
  if (!extraUtility) {
    return res.status(responseCodes.badRequest).json({
      error: `No extraUtility found with id: ${id}`,
    });
  }
  const update: IUpdateExtraUtility = {
    id,
    name,
    description,
    price,
    amount,
    dateFrom,
    dateTo
  };

  const result = await extraUtilitiesService.updateExtraUtility(update);
  if (!result) {
    return res.status(responseCodes.serverError).json({});
  }
  return res.status(responseCodes.noContent).json({});
};

const extraUtilitiesController = {
  getAllExtraUtilities,
  getExtraUtilityById,
  createExtraUtility,
  updateExtraUtility,
};

export default extraUtilitiesController;
