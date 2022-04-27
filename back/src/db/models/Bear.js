import { BearModel } from '../schemas/bear';

class Bear {
  static async findByUserId({ user_id }) {
    return await BearModel.findOne(user_id);
  }

  static async findAll() {
    return await BearModel.find({});
  }

  static async updateById({ user_id, toUpdate }) {
    const filter = { id: user_id };
    const update = { $set: toUpdate };
    const option = { returnOriginal: false };

    return await BearModel.findOneAndUpdate(filter, update, option);
  }
}

export { Bear };
