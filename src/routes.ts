import express from 'express'; //when have triple dot, that is, because don't have type for this import;
import knex from './database/connection';

import ItemsController from './controllers/itemsController';
import PointsController from './controllers/pointsController';

const routes = express.Router();
const itemsController = new ItemsController();
const pointsController = new PointsController();

routes.get('/', (req, res) => {
  return res.json({ message: 'Ta funfando!' })
});

routes.get('/items', itemsController.ListItems);
routes.post('/points', pointsController.create);

export default routes;