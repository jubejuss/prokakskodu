import { Request, Response } from 'express';
import responseCodes from '../general/responseCodes';
import usersService from './service';
import { IUpdateUser, INewUser } from './interfaces';

const usersController = {
  getAllUsers: async (req: Request, res: Response) => {
    const users = await usersService.getAllUsers();
    return res.status(responseCodes.ok).json({
      users,
    });
  },
  getUserById: async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: 'No valid id provided',
      });
    }
    if (id === res.locals.user.id || res.locals.user.role === 'Admin') {
      const user = await usersService.getUserById(id);
      if (!user) {
        return res.status(responseCodes.badRequest).json({
          error: `No user found with id: ${id}`,
        });
      }
      return res.status(responseCodes.ok).json({
        user,
      });
    }
    return res.status(responseCodes.notAuthorized).json({
      error: 'You have no permission for this info',
    });
  },
  removeUser: async (req: Request, res: Response) => {
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
    const response = await usersService.removeUser(id);
    if (!response) {
      return res.status(responseCodes.serverError).json({});
    }
    return res.status(responseCodes.noContent).json({});
  },
  createUser: async (req: Request, res: Response) => {
    const { apartmentNr, firstName, lastName, password, email } = req.body;

    if (!apartmentNr) {
      return res.status(responseCodes.badRequest).json({
        error: 'Apartment number is required',
      });
    }
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
    if (!email) {
      return res.status(responseCodes.badRequest).json({
        error: 'Email is required',
      });
    }
    if (!password) {
      return res.status(responseCodes.badRequest).json({
        error: 'Password is required',
      });
    }
    const newUser: INewUser = {
      apartmentNr,
      firstName,
      lastName,
      email,
      password,
      role: 'User',
    };
    const id = await usersService.createUser(newUser);
    return res.status(responseCodes.created).json({
      id,
    });
  },
  updateUser: async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    const { apartmentNr, firstName, lastName, email, password, role } =
      req.body;
    const isAdmin = res.locals.user.role === 'Admin';
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: 'No valid id provided',
      });
    }
    if (
      !apartmentNr &&
      !firstName &&
      !lastName &&
      !email &&
      !password &&
      !role
    ) {
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
    const updateUser: IUpdateUser = {
      id,
    };
    if (firstName) updateUser.firstName = firstName;
    if (lastName) updateUser.lastName = lastName;
    if (email) updateUser.email = email;
    if (password) updateUser.password = password;
    if (role && isAdmin) updateUser.role = role === 'Admin' ? 'Admin' : 'User';
    const result = await usersService.updateUser(updateUser);
    if (!result) {
      res.status(responseCodes.serverError).json({});
    }
    return res.status(responseCodes.noContent).json({});
  },
};

export default usersController;
