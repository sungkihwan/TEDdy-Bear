import { BearModel } from '../schemas/bear';

class Bear {
  static async findByUserId({ user_id }) {
    return await BearModel.findOne(user_id);
  }

  static async findAll() {
    return await BearModel.find({});
  }
}

export { Bear };
