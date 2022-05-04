import { Schema, model } from "mongoose";

const SomTTLSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    expireAt: {
      type: Date,
      required: true,
      default: () => Date.now(),
      expires: 3600 * 24,
    },
  },
  { _id : false }
);

const SomTTLModel = model("SomTTL", SomTTLSchema);

export { SomTTLModel };
