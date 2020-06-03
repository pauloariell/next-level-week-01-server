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
  
    const ids = await trx('points').insert({
      image: 'image-fake',
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf
    });
  
    const pointItems = items.map((item_id: number) => {
      return {
        item_id,
        point_id: ids[0]
      }
    });
  
    await trx('point_items').insert(pointItems);
    return res.json({sucess:true});
  }
};

export default PointsController;
