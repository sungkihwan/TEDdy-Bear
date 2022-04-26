import { TalkModel } from "../schemas/talk";

class Talk {
  static findOneById({ id }) {
    return TalkModel.findOne({ id: id });
  }

  // static findAll({ perPage, page }) {
  //   return TalkModel.find({})
  //     .skip(perPage * (page - 1))
  //     .limit(perPage);
  // }

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
}

export { Talk };
