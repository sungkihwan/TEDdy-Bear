import { TalkModel } from "../schemas/talk";

class Talk {
  static findOneById({ talk_id }) {
    return TalkModel.findOne({ talk_id: talk_id });
  }

  static findAll({ perPage, page }) {
    return TalkModel.find({})
      .skip(perPage * (page - 1))
      .limit(perPage);
  }

  static findManyRandom(myTopics, size) {
    return TalkModel.aggregate([
      {
        $match: {
          topics: { $in: myTopics },
        },
      },
      { $sample: { size: size } },
    ]);
  }
}

export { Talk };
