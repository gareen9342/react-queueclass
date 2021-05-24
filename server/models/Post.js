const mongoose = require("mongoose");
const postSchema = mongoose.Schema(
  {
    image: {
      type: String,
    },
    content: {
      type: String,
    },
    writer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    deleted: { type: Number, default: 0 }, // 0 : not deleted, 1 : deleted
  },
  { timestamps: true }
);
module.exports = mongoose.model("Post", postSchema);
