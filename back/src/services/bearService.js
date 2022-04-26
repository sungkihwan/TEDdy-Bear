import { Bear } from '../db';

//곰

class bearService {
  static async findByUserId(userId) {
    return await Bear.findByUserId(userId);
  }
}

export { bearService };
