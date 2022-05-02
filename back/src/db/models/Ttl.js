import { TtlModel } from '../schemas/ttl';

class Ttl {
  static async create({ newItem }) {
    return await TtlModel.create(newItem);
  }

  static async find({ code }) {
    return TtlModel.find({ code });
  }
}

export { Ttl };
