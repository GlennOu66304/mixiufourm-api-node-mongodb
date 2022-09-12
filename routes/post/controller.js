// when you finish the copy, make sure you chang the model name
import ProfileModel from "../../models/Profile.js"; //controlller.js in andy
import UserModel from "../../models/User.js"; //controlller
import PostModel from "../../models/Post.js"; //controlller
export default {
  // get all post
  getPost: async (req, res) => {
    try {
      // find all sort
      const allPost = await PostModel.find().sort({ date: -1 });
      // send back the data
      res.status(200).json(allPost);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
  // get one Post

  getOnePost: async (req, res) => {
    try {
      // findOneById
      const onePost = await PostModel.findById(req.params.id);
      res.status(200).json(onePost);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
  buildPost: async (req, res) => {
    try {
      // 1define the data and //2.Post Model save the data

      const newPost = await PostModel({
        text: req.body.text,
        name: req.body.name,
        user: req.user.id,
      }).save();
      //send back the data
      res.status(200).json(newPost);
    } catch (error) {
      res.status(404).json(error);
    }
  },
  // delete one Post
  deletePost: async (req, res) => {
    try {
      // find this profile,
      const deletePost = await ProfileModel.findOne({ user: req.user.id }).then(
        (profile) => {
          //  then find this post id
          PostModel.findById(req.params.id).then((post) => {
            // verify if the post owner process this action
            if (post.user.toString() !== req.user.id)
              throw new Error(
                "can not delete the post unless you are the author"
              );
            // to delete it
            post.remove();
          });
        }
      );

      res.status(200).json({ msg: "success" });
    } catch (error) {
      res.status(404).json(error);
    }
  },

  likePost: async (req, res, next) => {
    try {
      //             save the like
      const like = await ProfileModel.findOne({ user: req.user.id }).then(
        (profile) => {
          //  then find this post id
          PostModel.findById(req.params.post_id).then((post) => {
            // check if there is a id in the database like array,
            if (
              post.likes.filter((like) => like.user.toString() == req.user.id)
                .length > 0
            ) {
              // yes. then say the user is liked before,
              return res
                .status(404)
                .json({ msg: "this user is liked the post before" });
            }
            // other wise, then save the like information
            post.likes.unshift({ user: req.user.id });
            post.save().then((post) => res.status(200).json(post));
          });
        }
      );
    } catch (error) {
      res.status(404).json(error);
    }
  },

  unlikePost: async (req, res, next) => {
    try {
      //             remove the like
      const like = await ProfileModel.findOne({ user: req.user.id }).then(
        (profile) => {
          //  then find this post id
          PostModel.findById(req.params.post_id).then((post) => {
            // check if there is a id in the database like array,
            if (
              post.likes.filter((like) => like.user.toString() == req.user.id)
                .length == 0
            ) {
              // yes. then say the user is liked before,
              return res
                .status(404)
                .json({ msg: "this user did not like the post before" });
            }

            const removeIndex = post.likes
              .map((item) => item.user.toString())
              .indexOf(req.user.id);
            post.likes.splice(removeIndex, 1);
            post.save().then((post) => res.status(200).json(post)); // do not forget to save this into the database
          });
        }
      );
    } catch (error) {
      res.status(404).json(error);
    }
  },

  buildComment: async (req, res) => {
    try {
      //             save the like
      const comment = await ProfileModel.findOne({ user: req.user.id }).then(
        (profile) => {
          //     //  then find this post id
          PostModel.findById(req.params.post_id).then((post) => {
            const newComment = {
              text: req.body.text,
              user: req.user.id,
            };

            // use the array.unshift add the value to the array and
            post.comments.unshift(newComment);

            post.save().then((post) => res.status(200).json(post));
          });
        }
      );
    } catch (error) {
      res.status(404).json(error);
    }
  },
  deleteComment: async (req, res) => {
    try {
      //             remove the like
      const like = await ProfileModel.findOne({ user: req.user.id }).then(
        (profile) => {
          //  then find this post id
          PostModel.findById(req.params.post_id).then((post) => {
            // check if there is a id in the database like array,
            if (
              post.comments.filter(
                (comment) => comment.user.toString() == req.user.id
              ).length == 0
            ) {
              // yes. then say the user is liked before,
              return res
                .status(404)
                .json({ msg: "this user did not make the post before" });
            }

            const removeIndex = post.comments
              .map((item) => item._id.toString())
              .indexOf(req.params.comment_id);
            post.comments.splice(removeIndex, 1);
            post.save().then((post) => res.status(200).json(post)); // do not forget to save this into the database
          });
        }
      );
    } catch (error) {
      res.status(404).json(error);
    }
  },
};
