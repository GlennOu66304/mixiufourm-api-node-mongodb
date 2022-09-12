import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// const BucketListItem = model('bucketListItem', BucketListItemSchema)

// module.exports = BucketListItem
// export the model
export default mongoose.model("users", UserSchema); //'BucketListItem2' defined the name of the collections
