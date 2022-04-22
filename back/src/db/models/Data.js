import { DataModel } from '../schemas/data';

class Data {
  static async findById(id) {
    return await DataModel.findOne({ id });
  }

  static async findAll() {
    return await DataModel.find({ });
  }
}

export { Data };
