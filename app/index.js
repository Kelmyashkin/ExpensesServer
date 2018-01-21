import Koa from 'koa';
import cors from '@koa/cors';
import config from 'config';
import mongoose from 'mongoose';

import error from './middleware/error';
import { routes, allowedMethods } from './middleware/routes';

const app = new Koa();

mongoose.Promise = global.Promise;
mongoose.connect(config.database.link).then(
  () => {
    console.log('Database is connected');
  },
  err => {
    console.log(`Can not connect to the database ${err}`);
  },
);

app.use(error);
app.use(cors());
app.use(routes());
app.use(allowedMethods());

app.listen(config.server.port, () => {
  console.log('%s listening at port %d', config.app.name, config.server.port);
});
