/**
 * View History Router
 *
 * 클라이언트로부터 넘어온 정보들을 viewHistoryService에 넘겨주고, 해당 작업에 맞는 return을 받아서 클라이언트로 보내준다.
 */

import { Router } from 'express';
import { login_required } from '../middlewares/login_required';
import { ViewHistoryService } from '../services/viewHistoryService';

const viewHistoryRouter = Router();

/**
 * @swagger
 * tags:
 *   name: view history
 *   description: 시청목록 조회
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    ViewHistory:
 *      type: object
 *      properties:
 *        user_id:
 *          type: string
 *        talkId:
 *          type: string
 *        createdAt: 
 *          type: date
 *        updatedAt: 
 *          type: date

 */

/**
 * @swagger
 *
 * /viewhistory/create:
 *  post:
 *    summary: "시청기록 추가"
 *    description: "POST 방식으로 시청기록을 추가, 동영상 링크를 누르면 호출"
 *    tags: [viewhistory]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#components/schemas/ViewHistory'
 */

viewHistoryRouter.use(login_required);

// viewHistory를 만드는 router api (링크 클릭시 호출)
viewHistoryRouter.post('/viewhistory/create', async function (req, res, next) {
  try {
    const { user_id, talkId } = req.body;

    const newViewHistory = await ViewHistoryService.addViewHistory({
      user_id,
      talkId,
      // url,
      // title,
    });
    if (newViewHistory.errorMessage) {
      throw new Error(newViewHistory.errorMessage);
    }

    res.status(200).json(newViewHistory);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /viewhistories/{id}:
 *  get:
 *    summary: "시청기록 id를 통한 시청기록 조회"
 *    description: "요청 경로에 값을 담아 서버에 보낸다."
 *    tags: [viewhistory]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: 시청목록 id
 *        schema:
 *          type: string
 *    responses:
 *      "200":
 *        description: 시청기록 조회 성공
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schemas/ViewHistory'
 */

// 해당 viewHistoryId에 맞는 viewhistory 조회
viewHistoryRouter.get('/viewhistories/:id', async function (req, res, next) {
  try {
    const viewHistoryId = req.params.id;
    const viewHistory = await ViewHistoryService.getViewHistory({
      viewHistoryId,
    });

    res.status(200).send(viewHistory);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /viewhistorylist/{user_id}:
 *  get:
 *    summary: "유저 아이디를 통한 전체 시청목록 조회 "
 *    description: "요청 경로에 값을 담아 서버에 보낸다."
 *    tags: [viewhistory]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: 시청목록 id
 *        schema:
 *          type: string
 *    responses:
 *      "200":
 *        description: 시청기록 조회 성공
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#components/schemas/ViewHistory'
 */

// user_id에 알맞는 사용자의 viewhistory 리스트를 조회
viewHistoryRouter.get(
  '/viewhistorylist/:user_id',
  async function (req, res, next) {
    try {
      const currentUserId = req.currentUserId;
      const user_id = req.params.user_id;

      //해당 user_id에 맞는 목록을 db에서 가져와 조회
      const viewHistorylist = await ViewHistoryService.getViewHistorylist({
        currentUserId,
        user_id,
      });
      res.status(200).send(viewHistorylist);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @swagger
 * /viewhistorydatelist/{user_id}/{date}:
 *  get:
 *    summary: "유저 아이디와 날짜를 통한 날짜별 유저목록 조회 "
 *    description: "요청 경로에 값을 담아 서버에 보낸다."
 *    tags: [viewhistory]
 *    parameters:
 *      - in: path
 *        name: user_id
 *        required: true
 *        description: 유저 아이디
 *      - in: path
 *        name: date
 *        required: true
 *        description: yyyymmdd
 *        schema:
 *          type: string
 *    responses:
 *      "200":
 *        description: 시청기록 조회 성공
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#components/schemas/ViewHistory'
 */

viewHistoryRouter.get(
  '/viewhistorydatelist/:user_id/:date',
  async function (req, res, next) {
    try {
      const user_id = req.params.user_id;
      const date = req.params.date;
      const currentUserId = req.currentUserId;

      const viewHistoryDatelist = await ViewHistoryService.getViewHistoryDate({
        currentUserId,
        user_id,
        date,
      });

      res.status(200).send(viewHistoryDatelist);
    } catch (error) {
      next(error);
    }
  }
);

export { viewHistoryRouter };
