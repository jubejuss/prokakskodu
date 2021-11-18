import express, { Application } from 'express';
import cors from 'cors';
import usersController from './components/users/controller';
import utilitiesController from './components/utilities/controller';
import gasVolumesController from './components/gasVolume/controller';
import randomServicesController from './components/randomService/controller';

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

app.get('/utilities', utilitiesController.getAllUtilities);
app.get('/utilities/:id', utilitiesController.getUtilityById);
app.delete('/utilities/:id', utilitiesController.removeUtility);

app.get('/gasvolumes', gasVolumesController.getAllVolumes);
app.get('/gasvolumes/:id', gasVolumesController.getVolumeById);

app.get('/randomservices', randomServicesController.getAllServices);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port: ${port}`);
});
