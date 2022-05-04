import { SomTTLModel } from '../schemas/somTTL';

class SomTTL {
  static async create({ newItem }) {
    return await SomTTLModel.create(newItem);
  }

  static async find({ id }) {
    return SomTTLModel.find({ id });
  }
}

export { SomTTL };
