import { Router } from 'express';
import { login_required } from '../middlewares/login_required';
import { bearService } from '../services/bearService';

const bearRouter = Router();
bearRouter.use(login_required);

// bear get 요청
bearRouter.get('/bear/:userId', async function (req, res, next) {
  try {
    const userId = req.params;

    const bear = await bearService.getBear({ userId });
    res.status(200).send(bear);
  } catch (error) {
    next(error);
  }
});

export { bearRouter };
