import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      immutable: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: function() {
        return this.infoProvider === "User";
      }
    },
    bearName: {
      type: String,
      default: "Teddy",
    },
    myTopics: {
      type: Array,
      default: []
    },
    infoProvider: {
      type: String,
      enum: {
        values: ["User", "Google"],
        message: "{VALUE} is not supported",
      },
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = model("User", UserSchema);

export { UserModel };
