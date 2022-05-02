import { Schema, model } from "mongoose";

const TtlSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
    },
    expireAt: {
      type: Date,
      expires: 600,
    },
  },
  { timestamps: true }
);

const TtlModel = model("Ttl", TtlSchema);

export { TtlModel };
