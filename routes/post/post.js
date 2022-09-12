//Route
// const { Router } = require("express");
import express from "express";
import { authJwt } from "../middleware/passport.js";

const router = express.Router();

// data model import
import PostController from "./controller.js"; //need to add extension js, other wise will cause the error

// test router:private
router.post("/test", authJwt, (req, res) => {
  res.json({ msg: "Post route connected" });
});
router.get("/",  PostController.getPost);
router.get("/:id",  PostController.getOnePost);
//build Post
router.post("/", authJwt, PostController.buildPost);
// delete the Post
router.delete("/:id", authJwt, PostController.deletePost);


// like
router.post("/like/:post_id", authJwt, PostController.likePost);
router.post("/unlike/:post_id", authJwt, PostController.unlikePost);

// comment
router.post("/comment/:post_id", authJwt, PostController.buildComment);//postid
router.delete("/comment/:post_id/:comment_id", authJwt, PostController.deleteComment);//postid then commentid

export default router;
