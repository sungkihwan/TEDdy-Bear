import { Schema, model } from "mongoose";

const MailTTLSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
    },
    expireAt: {
      type: Date,
      required: true,
      default: () => Date.now(),
      expires: 600,
    },
  },
  { _id: false }
);

const MailTTLModel = model("MailTTL", MailTTLSchema);

export { MailTTLModel };
