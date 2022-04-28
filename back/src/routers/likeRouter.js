import { Router } from 'express';
import { Like } from '../db/models/Like';
// import { login_required } from '../middlewares/login_required';
import { likeService } from '../services/talkService';

const likeRouter = Router();

likeRouter.post('/like/add', async function (req, res, next) {
  try {
    let { userId, talkId } = req.body;
  } catch (error) {
    next(error);
  }
});

export { likeRouter };
