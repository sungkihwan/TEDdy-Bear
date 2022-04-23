/**
 * View History Router
 *
 * 클라이언트로부터 넘어온 정보들을 viewHistoryService에 넘겨주고, 해당 작업에 맞는 return을 받아서 클라이언트로 보내준다.
 */
import { Router } from 'express';
import { login_required } from '../middlewares/login_required';
import { ViewHistoryService } from '../services/viewHistoryService';

const viewHistoryRouter = Router();
viewHistoryRouter.use(login_required);

// viewHistory를 만드는 router api (링크 클릭시 호출)
viewHistoryRouter.post('/viewhistory/create', async function (res, req, next) {
  try {
    // const { user_id, talkId, url, title } = req.body;
    const user_id = req.body.user_id;
    const talkId = req.body.talkId;
    const url = req.body.url;
    const title = req.body.title;

    const newViewHistory = await ViewHistoryService.addViewHistory({
      user_id,
      talkId,
      url,
      title,
    });
    if (newViewHistory.errorMessage) {
      throw new Error(newViewHistory.errorMessage);
    }

    res.status(200).json(newViewHistory);
  } catch (error) {
    next(error);
  }
});

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

// user_id에 알맞는 사용자의 viewhistory 리스트를 조회
viewHistoryRouter.get(
  '/viewHistorylist/:user_id',
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

export { viewHistoryRouter };
