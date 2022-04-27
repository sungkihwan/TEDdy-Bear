import { Router } from 'express';
import { login_required } from '../middlewares/login_required';
import { bearService } from '../services/bearService';

const bearRouter = Router();
bearRouter.use(login_required);

// bear get 요청
bearRouter.get(
  '/bear/:userId',
  login_required,
  async function (req, res, next) {
    try {
      const userId = req.params;

      const bear = await bearService.getBear({ userId });
      res.status(200).send(bear);
    } catch (error) {
      next(error);
    }
  }
);

bearRouter.put(
  '/bear/:userId',
  // login_required,
  async function (req, res, next) {
    try {
      // URI로부터 사용자 id를 추출함.
      const user_id = req.params.id;
      // body data 로부터 업데이트할 사용자 정보를 추출함.
      const bearName = req.body.bearName ?? null;
      const level = req.body.level ?? null;
      const cotton = req.body.cotton ?? null;

      const toUpdate = {
        bearName,
        level,
        cotton,
      };

      // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
      const updatedBear = await bearService.setBear({
        user_id,
        toUpdate,
      });

      // if (updatedBear.errorMessage) {
      //   throw new Error(updatedBear.errorMessage);
      // }

      res.status(200).json(updatedBear);
    } catch (error) {
      next(error);
    }
  }
);

export { bearRouter };
