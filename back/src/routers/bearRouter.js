import { Router } from 'express';
import { login_required } from '../middlewares/login_required';
import { bearService } from '../services/bearService';

const bearRouter = Router();

bearRouter.get('bear/:userId', async (req, res, next) => {
  try {
    const userId = await bearService.findByUserId(req.params.userId);
    res.staus(200).send(data);
  } catch (error) {
    next(error);
  }
});

export { bearRouter };
