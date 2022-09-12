// Goal: before you submit the file, you will see the validation message

import Validator from "validator";
import {isEmpty} from "./isEmpty.js";

export default (data) => {
  let errors = {};
  //   1).name
  //   chaeck if it exiist in the value
  if (Validator.isEmpty(data.name)) {
    errors.name = "名字不能为空!";
  }
  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "名字的长度不能小于2位且不能大于30位!";
  }
//   //   2).email

if (Validator.isEmpty(data.email)) {
    errors.email = "邮箱不合法!";
  }
  if (!Validator.isLength(data.email, { min: 6, max: 15 })) {
    errors.email = "邮箱的长度不能小于6位且不能大于30位!";
  }
//   // 3).passord
if (Validator.isEmpty(data.password)) {
    errors.password = "密码不能为空!";
  }
  if (!Validator.isLength(data.password, { min:6, max: 30 })) {
    errors.password = "密码的长度不能小于6位且不能大于30位!";
  }
//   // 4).passowrd2

if (Validator.isEmpty(data.password2)) {
    errors.password2 = "确认密码不能为空!";
  }

  if (!Validator.equals(data.password,data.password2))  {
    errors.password2= "两次密码不一致";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
