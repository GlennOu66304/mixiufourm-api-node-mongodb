//Route
// const { Router } = require("express");
import express from "express";

const router = express.Router();

// data model import
// const BucketListItem = require("../../models/BucketListItem");
import BucketListItemController from "./controller.js"; //need to add extension js, other wise will cause the error

// get:find()
router.get("/", BucketListItemController.findPost);

// // build:save()
router.post("/", BucketListItemController.buildPost);

// // update:findByIdAndUpdate()
router.put("/:id", BucketListItemController.updatePost);

// // delete the post:findByIdAndDelete()
router.delete("/:id", BucketListItemController.deletePost);

// module.exports = router;
export default router;
