// Goal: 
// give the authorization = bearer + token in the header, you can get the user's id, user's nam
// 4.build a new passowrd.js to implete the logic(passport.js) in auth folder
// 1)import User model, passport,passport-jwt, mongoose package,keys
import dotenv from "dotenv";
import UserModel from "../../models/User.js";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import passport from "passport";

dotenv.config();
const privateKey = process.env.JWT_SECRET_KEY;

// opts:2)const opts, extract jws
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = privateKey;

// const JWTStrategy = new JWTStrategy(opts, (payload,done) =>{
//   console.log(payload);

// })

passport.use(
  new JWTStrategy(opts, (jwt_payload, done) => {
    // console.log(jwt_payload);
    UserModel.findById(jwt_payload.id)
      .then((user) => {
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      })
      .catch((err) => console.log(err));
  })
);

// 3)export this file
export const authJwt = passport.authenticate("jwt", {
  session: false,
});


