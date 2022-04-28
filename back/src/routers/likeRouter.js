import { Router } from 'express';
// import { login_required } from '../middlewares/login_required';
import { likeService } from '../services/likeService';

const likeRouter = Router();
// viewHistoryRouter.use(login_required);

// like get, post, delete

likeRouter.post('/like/:userId', async function (req, res, next) {
  try {
    const userId = req.params.userId;
    const talkId = req.body.talkId;

    const newLike = await likeService.addlike({ userId, talkId });

    res.status(200).send(newLike);
  } catch (error) {
    next(error);
  }
});

// 유저가 좋아요한 동영상 리스트 가져오기
likeRouter.get('/likelist/:userId', async function (req, res, next) {
  try {
    const userId = req.params.userId;
    const userLike = await likeService.getUserLikeList({ userId });

    res.status(200).send(userLike);
  } catch (error) {
    next(error);
  }
});

// 해당 동영상에 좋아요를 누른 유저 리스트 가져오기
likeRouter.get('/likelist/:talkId', async function (req, res, next) {
  try {
    const talkId = req.params.talkId;
    const talkLike = await likeService.getTalkLikeList({ talkId });

    res.status(200).send(talkLike);
  } catch (error) {
    next(error);
  }
});

// 좋아요 삭제
likeRouter.delete(
  '/like/delete/:userId/:talkId',
  async function (req, res, next) {
    try {
      const userId = req.params.userId;
      const talkId = req.params.talkId;

      const result = await likeService.deleteLike({ userId, talkId });

      if (result.errorMessage) {
        throw new Error(result.errorMessage);
      }

      res.send(200).send(result);
    } catch (error) {
      next(error);
    }
  }
);

export { likeRouter };
