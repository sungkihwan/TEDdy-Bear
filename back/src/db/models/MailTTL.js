import { MailTTLModel } from '../schemas/mailTTL';

class MailTTL {
  static async create({ newItem }) {
    return await MailTTLModel.create(newItem);
  }

  static async find({ code }) {
    return MailTTLModel.find({ code });
  }
}

export { MailTTL };
