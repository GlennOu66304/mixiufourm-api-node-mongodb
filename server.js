import express from "express";

import mongoose from "mongoose";
import dotenv from "dotenv";

// import cors from "cors";

import morgan from "morgan";
import bodyParser from "body-parser";
import BucketListItemRouter from "./routes/api/bucketListItems.js";
import ProfileRouter from "./routes/profile/profile.js";
import PostRouter from "./routes/post/post.js";
// 1.userRoutes
import Authentication from "./routes/auth/user.js";
// import Sms from "./routes/captcha/sms/sms.js";
import path from "path";
// import passport:the "passport"after import is the varible name
import passport from "passport";
import { authJwt } from "./routes/middleware/passport.js";
const app = express();
// 2.solve the cors issue:

// app.use(cors());

app.use(morgan("tiny"));
app.use(bodyParser.json());

// 2)passport initlize
app.use(passport.initialize());
// import test from  './routes/middleware/passport.js';
// test()

// connect the mongodb database
dotenv.config();
const url = process.env.MONGO_URI;
const PORT = process.env.PORT;
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB database Connected"))
  .catch((err) => console.log(err));

console.log(url);

// signUp
app.post("/api/signup", Authentication.signup); //api routes
// signIn
app.post("/api/signin", Authentication.signin); //api routes
// sms
// app.post("/api/phone", Sms.getSms); //api routes
// app.post("/api/verify", Sms.verifySms); //api routes
// 2.export this passport.js file into the server.js build new routes /current, 1)this routers will get the routes request from the passowrd(server.js):
// route build and get the data from the passport.js

app.post("/current", authJwt, (req, res) => {
  // 4.From this file, it will console.log the json data of the user
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
  });
});
// 2.api use start point
app.use("/api/bucketListItems", BucketListItemRouter); //api routes
app.use("/api/profile", ProfileRouter); //api routes
app.use("/api/post", PostRouter); //api routes
// producation mode
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/dist"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
  });
}

// app listening port
app.listen(PORT, () =>
  console.log(`App is listening at http://localhost:${PORT}`)
);
