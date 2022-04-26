import { UserModel } from '../schemas/user';

class User {
  static async create({ newUser }) {
    const createdNewUser = await UserModel.create(newUser);
    return createdNewUser;
  }

  static async findByEmail({ email }) {
    const user = await UserModel.findOne({ email });
    return user;
  }

  static async findById({ user_id }) {
    const user = await UserModel.findOne({ id: user_id });
    return user;
  }

  static async findAll() {
    const users = await UserModel.find({});
    return users;
  }

  //user 컬렉션에서 user_id와 매칭되는 user 정보를 삭제하는 함수
  static async deleteOneUser({ user_id }) {
    const user = await UserModel.deleteOne({ id: user_id });
    return user;
  }

  static async updateById({ user_id, toUpdate }) {
    const filter = { id: user_id };
    const update = { $set: toUpdate };
    const option = { returnOriginal: false };

    return await UserModel.findOneAndUpdate(filter, update, option);
  }

  // 곰 데이터 찾기
  static async findBearInfoByUserId({ user_id }) {
    const user = await UserModel.findOne({ id: user_id });

    const bearName = user.bearName;
    const level = user.level;
    const cotton = user.cotton;

    return { bearName, level, cotton };
  }
}

export { User };
