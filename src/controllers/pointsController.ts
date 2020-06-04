import {Request, Response} from 'express'
import knex from '../database/connection';

class PointsController {
  async create(req:Request, res:Response) {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items
    } = req.body;
    
    const trx = await knex.transaction();
  
    const point = {
      image: 'image-fake',
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf
    };
    
    const ids = await trx('points').insert(point);

    const point_id = ids[0];

    const pointItems = items.map((item_id: number) => {
      return {
        point_id,
        item_id
      }
    });
  
    const ret = await trx('point_items').insert(pointItems);
    await trx.commit();

    return res.json({
      id: point_id,
      ...point, 
    }); 
  };

  async index(req:Request, res:Response) {
    const points = await knex('points').select('*').orderBy('id');

    if (!points) {
      return res.status(400).json({ message: 'Point not found.' });
    }

    return res.json(points)
  };
  async show(req:Request, res:Response) {
    const { id } = req.params;
    const point = await knex('points').select('*').where('id', id).first();

    if (!point) {
      return res.status(400).json({ message: 'Point not found.' });
    }

    const items = await knex('items')
      .join('point_items', 'items.id', '=', 'point_items.item_id')
      .where('point_items.point_id', id)
      .select('items.title', 'items.image');

    point.items = items
    return res.json({point})
  };
};

export default PointsController;
