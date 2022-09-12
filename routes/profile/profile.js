//Route
// const { Router } = require("express");
import express from "express";
import { authJwt } from "../middleware/passport.js";

const router = express.Router();

// data model import
import ProfileController from "./controller.js"; //need to add extension js, other wise will cause the error

// test router:private
router.post("/test", authJwt, (req, res) => {
  res.json({ msg: "Profile route connected" });
});
// get:findOneProfile()
router.get("/", authJwt, ProfileController.findOneProfile);

// // build:save()
router.post("/", authJwt, ProfileController.buildProfile);

// 1.findProfileByHandle, with this type of router, you just put the handle name after the route
router.get("/handle/:handle", ProfileController.findProfileByHandle);
// / 1.findProfileByHandle
router.get("/user/:id", ProfileController.findProfileById);
// 4.get all user's profile data(include multiple users) & (public)
router.get("/all", ProfileController.getAllProfile);


// build the experience

router.post("/experience", authJwt, ProfileController.buildExperience);
// build the education
router.post("/education", authJwt, ProfileController.buildEducation);

// delete the user and profile

router.delete("/user", authJwt, ProfileController.deleteUserAndProfile);

// delete the experience
router.delete("/experience/:exp_id", authJwt, ProfileController.deleteExperience);

//delete the education
router.delete("/education/:ed_id", authJwt, ProfileController.deleteEducation);


export default router;
