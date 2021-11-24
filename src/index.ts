import express, { Application } from 'express';
import cors from 'cors';
import usersController from './components/users/controller';

import { port } from './components/general/settings';

// middleware
import middler from './components/general/testMiddleware';

const app: Application = express();
app.use(express.json());
app.use(cors());
// register middleware
app.use(middler);

app.get('/users', usersController.getAllUsers);
app.get('/users/:id', usersController.getUserById);
app.delete('/users/:id', usersController.removeUser);

app.post('/users', usersController.createUser);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port: ${port}`);
});
