import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
  // 1.general information
  // connect the users collections in mongdb database
  user: {
    type: mongoose.Schema.Types.ObjectId,
    // Mongoose/node error: Cannot read property 'ObjectId' of undefined
    // https://stackoverflow.com/questions/35074133/mongoose-node-error-cannot-read-property-objectid-of-undefined
    // Referencing another schema in Mongoose
    // https://stackoverflow.com/questions/18001478/referencing-another-schema-in-mongoose
    ref: "users",
  },
  // username
  handle: {
    type: String,
    required: true,
    max: 40,
  },
  company: {
    type: String,
  },
  location: {
    type: String,
  },
  website: { type: String },
  githubusername: { type: String },
  status: {
    type: String,
    required: true,
  },
  // skills
  skills: {
    type: [String],
    required: true,
  },

  bio: {
    type: String,
  },
  githubusername: {
    type: String,
  },
  experience: [
    // experience1
    {
      current: {
        type: Boolean,
      },
      title: {
        type: String,
      },
      company: {
        type: String,
      },
      location: {
        type: String,
      },

      description: {
        type: String,
      },
      to: {
        type: String,
      },

      from: {
        type: String,
      },
    },
  ],
  // education
  education: [
    // experience1
    {
      current: {
        type: Boolean,
      },
      school: {
        type: String,
      },
      degree: {
        type: String,
      },
      fieldofstudy: {
        type: String,
      },
      from: {
        type: String,
      },
    },
  ],

  social: {
    wechat: {
      type: String,
    },
    QQ: {
      type: String,
    },
    tengxunkt: {
      type: String,
    },
    wangyikt: {
      type: String,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// const BucketListItem = model('bucketListItem', BucketListItemSchema)

// module.exports = BucketListItem
// export the model
export default mongoose.model("Profiles", ProfileSchema); //'BucketListItem2' defined the name of the collections
