import { sendSms } from "../tencentSMS.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
// import config from "../config.js";
// connect the redis

// import { createClient } from "redis";
// dotenv.config();
// const privateKey = process.env.JWT_SECRET_KEY;
// // create a client
// const client = createClient();
// // connect error
// client.on("error", (err) => console.log("Redis Client Error", err));
// // connct
// client.connect();

export default {
  getSms: async (req, res) => {
    try {
      //  send the sms
      // neeed to conver the random code into the string
      let phoneCode = Math.ceil(Math.random() * 1000000).toString();
      let phoneNumber = req.body.phone_number;
      // console.log(phoneCode);
      const item = await sendSms(req.body.phone_number, phoneCode);
      // console.log(item);

      if (item.code === 200) {
        // save the sms and phone number intot the redis and set the expire feature

        // phonenumber(key):code(number)
        client.SETEX(phoneNumber, 300, phoneCode);

        //SETEX will set the expire time as second base
        // PSETEX will set the expire time as mileseoond
        //[Never expire SET Key #1287](https://github.com/redis/node-redis/issues/1287)
        res.status(200).json({ msg: "已经发出验证码" });
      }

      // delete the sms
    } catch (error) {
      res.status(400).json({ msg: "发出验证码失败" });
    }
  },

  verifySms: async (req, res) => {
    // check if the req.phone numebr and code inthe saved codeList
    try {
      // req.code infomation
      const newPhone_code = {
        phone: req.body.phone_number,
        phone_code: req.body.phone_code,
      };
      // get the key: it is from the mongodb database
      // const database_phoneNumer =
      // get the value
      const database_code = await client.get(newPhone_code.phone);
      // console.log(database_code)
      const compare = database_code !== newPhone_code.phone_code;
      //  console.log(compare)

      if (compare) {
        res.json({ msg: "the code is wrong" });
      } else {
        // jwt token generate

        const rule = { foo: "bar" };
        // jwt token generate
        jwt.sign(rule, privateKey, { expiresIn: 3600 }, (err, token) => {
          if (err) throw err;

          res.status(200).json({
            succsss: true,
            // bearer to verify the token:change the mr wu token to bearer
            token: "Bearer " + token,
          });
        });
      }
    } catch (error) {
      res.status(400).json({ msg: "验证验证码失败" });
    }
  },
};
