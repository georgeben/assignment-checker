import mongoose from "mongoose";

const match = new mongoose.Schema(
  {
    firstSentence: String,
    secondSentence: String,
  },
  { _id: false },
);

const history = new mongoose.Schema(
  {
    firstStudent: {
      type: String,
    },
    secondStudent: {
      type: String,
    },
    similarity: {
      type: Number,
      required: true,
    },
    matches: {
      type: [match],
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

// eslint-disable-next-line func-names
history.virtual("percentage").get(function () {
  return (this.similarity * 100).toFixed(2);
});

export default mongoose.model("History", history);
