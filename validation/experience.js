// Goal: before you submit the file, you will see the validation message

import Validator from "validator";
import {isEmpty} from "./isEmpty.js";

export default (data) => {
  let errors = {};
  //   1).name
  //   chaeck if it exiist in the value
  data.title = !isEmpty(data.title) ? data.title : '';
  data.company = !isEmpty(data.company) ? data.company : '';
  data.from = !isEmpty(data.from) ? data.from : '';



  if(Validator.isEmpty(data.title)){
    errors.title = "个人经历的title不能为空!";
  }

  if(Validator.isEmpty(data.company)){
    errors.company = "个人经历的company不能为空!";
  }

  if(Validator.isEmpty(data.from)){
    errors.from = "个人经历的from不能为空!";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
