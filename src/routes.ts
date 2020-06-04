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

routes.get('/items', itemsController.index);

routes.post('/points', pointsController.create);
routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);

//standard names for methods API in the communit
//index(List:items)
//show(1:item)
//create items or items
//update item or items
//delete item or items

//comum patterns
//Server Patterns
//Repository Patters(Data mapper)

export default routes;