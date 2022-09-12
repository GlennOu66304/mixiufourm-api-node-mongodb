# mixiuFourm BackEnd README

[(node:9511) ExperimentalWarning: The ESM module loader is experimental](https://stackoverflow.com/questions/63317051/node9511-experimentalwarning-the-esm-module-loader-is-experimental)
```
10

you can use Node v14.12.0; where this probleme is solved, and read this doc https://nodejs.org/api/esm.html#esm_package_json_type_field
```
# UI Feature Description:PM will finish this part
I.UI Flow:
1.sign up, then go to the login page to fill the crenditional ;
2.then go the dashboard personal information page;
3.Dashboard Updae infomation update;
4.click the developement, then you will go to the develoer page sections;
5.click the developer, then it will go to the developer user profile page;
6.click the message board, it will show the the message list also you can post the message
7.you could follow up someone's message board, then comment it


#	Back end Post 
1.pue secrect keys into the env ile done
2.jwt learning
1).jwt js generate the token
2).user login
3)token save
3.vue pop up message learning
4.typora back space deletting, you can updte the typora dmg file to fix this issue

## Code Send Logic:
Request the sms code 
Platform send the code to user
Api save the phone number into the session 

## Redis build

redis install 
redis-server //start the redis server
redis-cli shutdown // shut down the redis server

### redist node connect: in the sms because only the sms js will use this
redis guI
1) Redis database save the phone number and sms code, set the code expire time 
set the redis value

2)then node js compared the req.phone number and code with the phone number, Code.// Register, login in the Redis 

1.get e redid value from the redis
2. then compare it with the req number
3. phone number does not match this one will be match with database
4. code does not match check it with the redis database
5. verify success

Code has the signUp
Code has the login:
login and login code

3) login will send back the JWT, save JWT 
, use the JWT to visite the other resource 
2) express session use
User input the code phone number to verify 
Api compare the imputed code and password is same or not?
Same true, false not
save the key and value into the redis

SMS Api:
SMS Receiving:
[手机验证码](https://www.cnblogs.com/guanqiweb/p/14968976.html)  
eleme: Front end Processing the sms login and signup
[Eleme](https://www.udemy.com/course/vuecli3-elemeapp/learn/lecture/13776144#overview)

0.database change from the terminal method to the dot env method
## I.sign up and login post:(Social Media)


1.data model one file: export the data user.js:

### 2.api route import this model, then build the logic and export route:
1)fold contains different files;
2)understand the logic:(login)

### 3.try to anayze the code block, 
comment it , then add it
fllow the code comment put the coding logic
then write the code by yourself
under the comment logic

### 4.code Block
2.1)Try catch logic()
2.2) comibine the logic with the social Media Project:
3)then start to imeplate the code logic into it
3.server.js import the fold

### 5.post man testing:
1）new fold build
2)get the profile information of the user
3)build the profile information of the user
4)impoer the post man api json;
5)create a sub folder: process the testing
## II.personal infomation post:Profile data
## III.personal infomation post:Comment

Goal: 
build the comment
delete the comment

build the comment
const , then save the content to the database

delete the comment:
Logic:
fileter (like and unlike)
find this post, then check the req.params.id if === post.comment._id,
not same, then send the back the this comment does not exist

post.comment.map the array, then find the removeIndexof the this id,
then use the splice to remove this item
mongoose save this 


Buid a one, then copy paste and change
# resource:
1.output markdown
2.READM doc
3.ES6 Project demo
4.passport js, and server.js
5.andy mern 
3).chang the package logic from require to import(ESM and andy MERN)
4)register and login route is in the server.js
other route is in the its file 
# ES6 JWT Token Processing:
[ES6JWT Example](https://github.dev/GlennOu66304/nodejs-express-auth-passport-jwt-es6-example/tree/patch-1)
## ES6 node doc:
[https://nodejs.org/docs/latest-v17.x/api/all.html](https://nodejs.org/docs/latest-v17.x/api/all.html)

## ES6 export usage
import export a function:passport.js
```
import { authJwt } from "./routes/middleware/passport.js";
```
import export file in server.js
```
import Authentication from "./routes/auth/user.js";
it will have multiple function inthe user.js
```
import export package(server.js,express,mongoose)

