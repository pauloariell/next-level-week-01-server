import express from 'express'; //when have triple dot, that is, because don't have type for this import;
import knex from './database/connection';

const routes = express.Router();

routes.get('/', (req,res) =>{
  return res.json({message:'Ta funfando!'})
});

routes.get('/items', async(req, res) => {
  const items = await knex('items').select('*');

  const serializedItems = items.map(item => {
    return {
      title: item.title,
      image_url: `http://localhost:3333/uploads/${item.image}`
    }
  })

  return res.json(serializedItems);
});

export default routes;