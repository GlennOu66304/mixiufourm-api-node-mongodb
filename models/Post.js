import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  // 1.general information
  // connect the users collections in mongdb database
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  name: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  likes: [
    {
      user: {
        type: String,
      },
    },
  ],

  comments: [
    {
      date: {
        type: Date,
        default: Date.now,
      },
      text: {
        type: String,
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "profiles",
      },
    },
  ],

  date: {
    type: Date,
    default: Date.now,
  },
});

// const BucketListItem = model('bucketListItem', BucketListItemSchema)

// module.exports = BucketListItem
// export the model
export default mongoose.model("Posts", PostSchema); //'BucketListItem2' defined the name of the collections
