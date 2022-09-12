// import the scheme and model from mongoose
// const { Schema, model } = require('mongoose')
import mongoose  from 'mongoose'
// create new scheme
const BucketListItemSchema = new mongoose.Schema(

{

    description: {
       type: String,
       required: true,

    },
    date: {

        type: Date,
        default: Date.now,
    },

})

// const BucketListItem = model('bucketListItem', BucketListItemSchema)

// module.exports = BucketListItem
// export the model
export default mongoose.model('bucketListItems', BucketListItemSchema )//'BucketListItem2' defined the name of the collections