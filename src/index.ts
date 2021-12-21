import express, { Application } from 'express';
import cors from 'cors';
import usersController from './components/users/controller';
import authController from './components/auth/controller';

import { port } from './components/general/settings';

// middleware
import middler from './components/general/testMiddleware';
import isLoggedIn from './components/auth/isLoggedInMiddleware';
import isAdmin from './components/auth/isAdminMiddleware';

const app: Application = express();
app.use(express.json());
app.use(cors());
// register middleware
app.use(middler);

// login
app.post('/login', authController.login);


// greate user
app.post('/users', usersController.createUser);

app.use(isLoggedIn);

// app.get('/users', usersController.getAllUsers);
// add isAdminMiddleware to controll is admin or not
app.get('/users', isAdmin, usersController.getAllUsers);
app.get('/users/:id', usersController.getUserById);
app.delete('/users/:id', usersController.removeUser);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port: ${port}`);
});
