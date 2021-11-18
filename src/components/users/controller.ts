import { Request, Response } from 'express';
import responseCodes from '../general/responseCodes';
import usersService from './service';

const usersController = {
  getAllUsers: (req: Request, res: Response) => {
    const users = usersService.getAllUsers();
    return res.status(responseCodes.ok).json({
      users,
    });
  },
  getUserById: (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: 'No valid id provided',
      });
    }
    const user = usersService.getUserById(id);
    if (!user) {
      return res.status(responseCodes.badRequest).json({
        error: `No user found with id: ${id}`,
      });
    }
    return res.status(responseCodes.ok).json({
      user,
    });
  },
  removeUser: (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: 'No valid id provided',
      });
    }
    const user = usersService.getUserById(id);
    if (!user) {
      return res.status(responseCodes.badRequest).json({
        message: `User not found with id: ${id}`,
      });
    }
    usersService.removeUser(id);
    return res.status(responseCodes.noContent).json({});
  },
  createUser: (req: Request, res: Response) => {
    const { apartment, firstName, lastName, email, phone, IBAN } = req.body;
    if (!firstName) {
      return res.status(responseCodes.badRequest).json({
        error: 'First name is required',
      });
    }
    if (!lastName) {
      return res.status(responseCodes.badRequest).json({
        error: 'Last name is required',
      });
    }
    if (!apartment) {
      return res.status(responseCodes.badRequest).json({
        error: 'Apartment is required',
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
    const id = usersService.createUser(
      apartment,
      firstName,
      lastName,
      email,
      phone,
      IBAN
    );
    return res.status(responseCodes.created).json({
      id,
    });
  },
  updateUser: (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    const { firstName, lastName } = req.body;
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: 'No valid id provided',
      });
    }
    if (!firstName && !lastName) {
      return res.status(responseCodes.badRequest).json({
        error: 'Nothing to update',
      });
    }
    const user = usersService.getUserById(id);
    if (!user) {
      return res.status(responseCodes.badRequest).json({
        error: `No user found with id: ${id}`,
      });
    }
    usersService.updateUser({ id, firstName, lastName });
    return res.status(responseCodes.noContent).json({});
  },
};

export default usersController;
