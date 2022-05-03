import { Router } from 'express';
import { dataService } from '../services/dataService';

const dataRouter = Router();

/**
 * @swagger
 * paths:
 *  /data/:id:
 *   get:
 *     summary: "data id로 조회"
 *     tags: [Data]
 *     parameters:
 *       - id: query
 *     responses:
 *       "200":
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Data'
 *       "400":
 *          description: 잘못된 요청
 *       "500":
 *          description: 서버 에러
 */
dataRouter.get('/data/:id', async function (req, res, next) {
      try {
        const data = await dataService.findById(req.params.id);
        res.status(200).send(data);
      } catch (error) {
        next(error);
      }
    }
);

/**
 * @swagger
 * paths:
 *  /data:
 *   get:
 *     summary: data 전체 조회
 *     tags: [Data]
 *     description: data 전체 조회
 *     responses:
 *       "200":
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ListData'
 *       "400":
 *          description: 잘못된 요청
 *       "500":
 *          description: 서버 에러
 */
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