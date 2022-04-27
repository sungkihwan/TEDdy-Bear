import { Bear } from '../db';

class bearService {
  static async getBear({ userId }) {
    return await Bear.findByUserId({ userId });
  }

  static async findAll() {
    return await Bear.findAll();
  }

  static async setBear({ user_id, toUpdate }) {
    let bear = await Bear.findByUserId({ user_id });
    if (!bear) {
      const errorMessage = '가입 내역이 없습니다. 다시 한 번 확인해 주세요.';
      return { errorMessage };
    }
    if (!toUpdate.bearName) delete toUpdate.bearName;
    if (!toUpdate.level) delete toUpdate.level;
    if (!toUpdate.cotton) delete toUpdate.cotton;

    return await Bear.updateById({ user_id, toUpdate });
  }
}

export { bearService };
