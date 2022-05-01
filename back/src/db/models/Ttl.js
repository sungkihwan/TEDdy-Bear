import { TtlModel } from '../schemas/ttl';

class Ttl {
  static async create({ newItem }) {
    return await TtlModel.create({newItem});
  }

  static async findById({ code }) {
    return TtlModel.findOne({ code });
  }
}

export { Ttl };
