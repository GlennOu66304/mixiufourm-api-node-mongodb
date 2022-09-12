import bucketListItemModel from "../../models/BucketListItem.js"; //controlller.js in andy

export default {
  findPost: async (req, res) => {
    try {
      const bucketListItems = await bucketListItemModel.find();

      if (!bucketListItems) throw new Error("No bucketListItems");

      const sorted = bucketListItems.sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });

      res.status(200).json(sorted);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  buildPost: async (req, res) => {
    // body content filled and get the req.body content
    // 1.define the data type outside the try catch
    const newBucketListItem = new bucketListItemModel(req.body);

    try {
      //   use the mongoose save method to save the item into the database
      // model save
      const bucketListItem = await newBucketListItem.save();

      // condition check
      if (!bucketListItem)
        throw new Error("Something went wrong saving the bucketListItem");

      //   send back the data to the console
      res.status(200).json(bucketListItem);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updatePost: async (req, res, next) => {
    const { id } = req.params;

    try {
      const response = await bucketListItemModel.findByIdAndUpdate(
        id,
        req.body
      );

      if (!response) throw Error("Something went wrong");

      const updated = { ...response._doc, ...req.body };

      res.status(200).json(updated);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  deletePost: async (req, res, next) => {
    const { id } = req.params;

    try {
      const removed = await bucketListItemModel.findByIdAndDelete(id);
      if (!removed) throw Error("something went wrong");
      res.status(200).json(removed);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
