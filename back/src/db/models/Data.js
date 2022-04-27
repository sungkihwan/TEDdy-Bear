import { DataModel } from '../schemas/data';

class Data {
  static async findById(dataId) {
    return await DataModel.findOne({ id : dataId });
  }

  static async findAll() {
    return await DataModel.find({ keys: { $exists:true } });
  }

  // stream data, noCursorTimeout option can't not use when using free tier
  static async streamData({}) {
    const cursor = DataModel.find({}).cursor().addCursorFlag('noCursorTimeout', true);

    for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
      console.log(doc); // Prints documents one at a time
    }
  }
}

export { Data };
