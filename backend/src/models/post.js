import mongoose, { Schema } from "mongoose";

const PostSchema = new Schema({
  publishedDate: {
    type: Date,
    default: Date.now,
  },
  user: {
    _id: mongoose.Types.ObjectId,
    username: String,
    profileurl: String,
  },
  contents: {
    type: String,
  },
  like: {
    type: Number,
    default: 0,
  },
  comments: {
    type: Number,
    default: 0,
  },
  fileurls: [String],
  likeby: [String],
  useremail: { type: String, ref: "users" }, //key
  comment: [
    {
      content: { type: String },
      who: { type: String },
      whoid: { type: mongoose.Types.ObjectId },
    },
  ],
});

PostSchema.statics.findByUseremail = function (email) {
  return this.find({ useremail: email });
};

const Post = mongoose.model("Post", PostSchema);
export default Post;
