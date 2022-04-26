import { BearModel } from '../schemas/bear';

class Bear {
  static findByUserId({ user_id }) {
    return BearModel.findOne(user_id);
  }
}

export { Bear };
