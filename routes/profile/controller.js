// when you finish the copy, make sure you chang the model name
import ProfileModel from "../../models/Profile.js"; //controlller.js in andy
import UserModel from "../../models/User.js"; //controlller

import validateProfileInput from "../../validation/profile.js";
import validateExperienceInput from "../../validation/experience.js";
import validateEducationInput from "../../validation/educarion.js";
export default {
  findOneProfile: (req, res) => {
    //              // 0.get profile also send back the user's name, email , avatar,
    const errors = {};
    ProfileModel.findOne({
      user: req.user.id,
    })
      // user is the model name user in the Profile.js not collection name
      .populate("user", ["name", "email"])
      .then((profiles) => {
        if (!profiles) {
          errors.noprofile = "No profiles";
          res.status(501).json({ errors });
        } else {
          res.status(200).json(profiles);
        }
      })
      .catch((err) => res.status(500).json(err));
  },

  buildProfile: (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    if (!isValid) {
      // send back the erroes to the console
      res.status(400).json(errors);
    }
    // req.body transform
    const profileFields = {};

    profileFields.user = req.user.id;
    // generala information
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;
    if (req.body.bio) profileFields.bio = req.body.bio;
    // skill
    if (typeof req.body.skills !== "undefined") {
      profileFields.skills = req.body.skills.split(",");
    }
    // experience
    // profileFields.experience = {};
    // education
    // profileFields.education = {};
    // social
    profileFields.social = {};

    if (req.body.wechat) profileFields.social.wechat = req.body.wecaht;
    if (req.body.QQ) profileFields.social.wechat = req.body.QQ;
    if (req.body.wangyikt) profileFields.social.wangyikt = req.body.wangyikt;

    ProfileModel.findOne({ user: req.user.id }).then((profile) => {
      // update the Profile Information
      if (profile) {
        ProfileModel.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then((profile) => res.json(profile));
      } else {
        //   // build profile
        ProfileModel.findOne({ handle: profileFields.handle }).then(
          (profile) => {
            if (profile) {
              errors.handle = "该用户的Handle已经存在,请勿重新创建";
              res.status(400).json(errors);
            }
            new ProfileModel(profileFields)
              .save()
              .then((profile) => res.json(profile));
          }
        );
      }
    });
  },

  // 1.findProfileByHandle
  findProfileByHandle: async (req, res) => {
    // 2)mongoose method:findOne
    try {
      const profiles = await ProfileModel.findOne({
        handle: req.params.handle,
      }).populate("user", [("name", "email")]);
      // 5)catch error
      if (!profiles) throw new Error("No profiles");
      // 3)then:send back the data
      res.status(200).json(profiles);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  //   3.user_id get the profile data, (public)
  findProfileById: async (req, res) => {
    try {
      const profiles = await ProfileModel.findOne({
        _id: req.params.id,
      }).populate("user", [("name", "email")]);
      // 5)catch error
      if (!profiles) throw new Error("No profiles");
      // 3)then:send back the data
      res.status(200).json(profiles);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  // 4.get all user's profile data(include multiple users) & (public)
  // if you use the try catch, you have to put the async and await
  getAllProfile: async (req, res) => {
    try {
      // 1.define the database action
      const profiles = await ProfileModel.find().populate("user", [
        ("name", "email"),
      ]);
      // 2.database action erroe
      if (!profiles) throw new Error("no profile found");
      // 3.send back the sata
      res.status(200).json(profiles);
    } catch (error) {
      res.status(500).json({ error: "something wrong" });
    }
  },

  // build the experience

  buildExperience: async (req, res) => {
    //       Goal:
    // generate an array contains many object as array element:
    // a object contains the 1 experiences
    // When you run the test, you can use the data from the json

    try {
      const { errors, isValid } = validateExperienceInput(req.body);

      if (!isValid) {
        // send back the erroes to the console
        res.status(400).json(errors);
      }
      // database check the action type
      const profiles = await ProfileModel.findOne({ user: req.user.id });

      if (!profiles) throw new Error("no user");

      // define a Object this one will be filled by the req.body as array element
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        description: req.body.description,
        from: req.body.from,
      };

      // create a array, then unshift the Object array element into the defined array name
      profiles.experience.unshift(newExp);

      // then save this data
      const experience = await new ProfileModel(profiles).save();
      // send the json data back
      res.status(200).json(experience);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  deleteExperience: async (req, res) => {
    try {
      //  0)find the user
      const profiles = await ProfileModel.findOne({ user: req.user.id });

      if (!profiles) throw new Error("no user");

      // 1)map find the sub experience ID
      const removeIndex = await profiles.experience
        // create a id pool array
        .map((item) => item._id)
        .indexOf(req.params.exp_id); // find the exp_id's postion in the array ofthe id
      // const beasts = ['ant', 'bison', 'camel', 'duck', 'bison'];
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
      // 2)then use the splice to remove it
      // remove the target value at the position index(0 start) start, how many elements will be removed
      // https://cs.github.com/GlennOu66304/Full-Stack-Development/blob/e016372c19a06f63cd5aa5c46692ce06a6265078/javascript/array.md?q=user%3AGlennOu66304+indexOf#L3

      profiles.experience.splice(removeIndex, 1);
      const profile = await profiles.save(); //start the index of the exp_id, delete 1 value
      // 3)save this change into the data base
      // profiles.save();
      // 4) send back the data
      res.status(200).json(profile);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // build the education

  buildEducation: async (req, res) => {
    try {
      const { errors, isValid } = validateEducationInput(req.body);

      if (!isValid) {
        // send back the erroes to the console
        res.status(400).json(errors);
      }
      // database check the action type
      const profiles = await ProfileModel.findOne({ user: req.user.id });

      if (!profiles) throw new Error("no user");

      // define a Object this one will be filled by the req.body as array element
      const newExp = {
        school: req.body.school,
        degree: req.body.degree,
        fieldofstudy: req.body.fieldofstudy,
        description: req.body.description,
        from: req.body.from,
      };

      // create a array, then unshift the Object array element into the defined array name
      profiles.education.unshift(newExp);

      // then save this data
      const education = await new ProfileModel(profiles).save();
      // send the json data back
      res.status(200).json(education);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  // delete the education
  deleteEducation: async (req, res) => {
    try {
      //  0)find the user
      const profiles = await ProfileModel.findOne({ user: req.user.id });

      if (!profiles) throw new Error("no user");

      // 1)map find the sub experience ID
      const removeIndex = await profiles.education
        // create a id pool array
        .map((item) => item._id)
        .indexOf(req.params.ed_id); // find the exp_id's postion in the array ofthe id
      // const beasts = ['ant', 'bison', 'camel', 'duck', 'bison'];
      // 2)then use the splice to remove it
      // remove the target value at the position index(0 start) start, how many elements will be removed  // https://cs.github.com/GlennOu66304/Full-Stack-Development/blob/e016372c19a06f63cd5aa5c46692ce06a6265078/javascript/array.md?q=user%3AGlennOu66304+indexOf#L3

      profiles.education.splice(removeIndex, 1);
      const profile = await profiles.save(); //start the index of the exp_id, delete 1 value
      // 3)save this change into the data base
      // profiles.save();
      // 4) send back the data
      res.status(200).json(profile);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // delete user and Profile
  deleteUserAndProfile: async (req, res) => {
    try {
      // delte the profile

      const profile = await ProfileModel.findOneAndRemove({
        user: req.user.id,
      });
      if (!profile) throw new Error("no profile");

      // delete the user
      const user = await UserModel.findOneAndRemove({ _id: req.user.id });
      if (!user) throw new Error("no user find");

      res.status(200).json({ msg: "delete user and profile success" });
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
