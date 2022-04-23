import { Router } from 'express';
import { dataService } from '../services/dataService';

const dataRouter = Router();

dataRouter.get('/data/:id', async function (req, res, next) {
      try {
        console.log(req.params.id)
        const data = await dataService.findById(req.params.id);
        console.log(data)
        res.status(200).send(data);
      } catch (error) {
        next(error);
      }
    }
);

dataRouter.get('/data', async function (req, res, next) {
    try {
      const data = await dataService.findAll();
      res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  }
);

export { dataRouter };