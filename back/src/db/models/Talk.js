import { TalkModel } from "../schemas/talk";

class Talk {
  static findOneById({ id, resultType }) {
    if (resultType === "document") { 
      return TalkModel.findOne({ id: id });
    } //else if(resultType === "POJO") {
    return TalkModel.findOne({ id: id }).lean();
    // }
  }

  static findManyRandom(topics, size) {
    return TalkModel.aggregate([
      {
        $match: {
          topics: { $in: topics },
        },
      },
      { $sample: { size: size } },
    ]);
  }

  static updateView(id, toUpdate) {
    return TalkModel.findOneAndUpdate({ _id: id }, toUpdate, {
      returnOriginal: false,
    });
  }
}

export { Talk };
