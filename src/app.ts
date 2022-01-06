import express, { Application } from 'express';
import swaggerUi from 'swagger-ui-express';
import openapi from './openapi.json'
import cors from 'cors'
import authController from './components/auth/controller';
import usersController from './components/users/controller';
import indicatorsController from './components/indicators/controller';
import gasController from './components/gas/controller';
import waterController from './components/water/controller';
import extraUtilitiesController from './components/extraUtilities/controller';
import ping from './components/ping/controller';

// middleware
import middler from './components/general/testMiddleware';
import isLoggedIn from './components/auth/isLoggedInMiddleware';
import isAdmin from './components/auth/isAdminMiddleware';

const app: Application = express();
app.use(express.json());
app.use(cors());
// register middleware
app.use(middler);

/**
 * API test endpoint
 */
app.get('/ping', ping);

// login
app.post('/login', authController.login);

// greate user
app.post('/users', usersController.createUser);

// app.use(isLoggedIn);

// app.get('/users', usersController.getAllUsers);
// add isAdminMiddleware to controll is admin or not
// app.get('/users', isAdmin, usersController.getAllUsers);
app.get('/users', usersController.getAllUsers);
app.get('/users/:id', usersController.getUserById);
app.delete('/users/:id', usersController.removeUser);

app.get('/indicators', indicatorsController.getAllIndicators);
app.get('/months', indicatorsController.getIndicatorsByMonths);

app.get('/gas', gasController.getAllGas);

app.get('/water', waterController.getAllWater);

app.get('/extrautilities', extraUtilitiesController.getAllExtraUtilities);
app.get('/extrautilities/:id', extraUtilitiesController.getExtraUtilityById);
app.patch('/extrautilities/:id', extraUtilitiesController.updateExtraUtility);
app.post('/extrautilities', extraUtilitiesController.createExtraUtility);

export default app;
