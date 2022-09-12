import Validator from "validator";
import { isEmpty } from "./isEmpty.js";

export default (data) => {
  let errors = {};

  //   //   2).email

  if (Validator.isEmpty(data.email)) {
    errors.email = "邮箱不合法!";
  }
  //   if (!Validator.isLength(data.email, { min: 6, max: 15 })) {
  //     errors.email = "邮箱的长度不能小于6位且不能大于30位!";
  //   }
  //   // 3).passord
  if (Validator.isEmpty(data.password)) {
    errors.password = "密码不能为空!";
  }
  //   if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
  //     errors.passoword = "密码的长度不能小于6位且不能大于30位!";
  //   }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
