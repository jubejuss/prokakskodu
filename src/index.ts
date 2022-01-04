import app from './app';
import config from './config';

const port = config.port || 3000;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port: ${port}`);
});
