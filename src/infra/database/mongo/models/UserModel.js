import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toObject: {
      virtuals: true,
      retainKeyOrder: true,
    },
    toJSON: {
      virtuals: true,
    },
  },
);

userSchema.methods.getPublicFields = function () {
  return {
    // eslint-disable-next-line no-underscore-dangle
    _id: this._id,
    email: this.email,
  };
};

export default mongoose.model("User", userSchema);
