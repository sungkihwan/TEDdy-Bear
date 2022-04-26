import { Bear } from '../db';

class bearService {
  static async getBear({ userId }) {
    return await Bear.findByUserId(userId);
  }

  static async findAll() {
    return await Bear.findAll();
  }
}

export { bearService };
