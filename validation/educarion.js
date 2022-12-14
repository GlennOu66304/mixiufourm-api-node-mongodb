// Goal: before you submit the file, you will see the validation message

import Validator from "validator";
import {isEmpty} from "./isEmpty.js";

export default (data) => {
  let errors = {};
  //   1).name
  //   chaeck if it exiist in the value
  data.school = !isEmpty(data.school) ? data.school : '';
  data.degree = !isEmpty(data.degree) ? data.degree : '';
  data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : '';
  data.from = !isEmpty(data.from) ? data.from : '';



  if(Validator.isEmpty(data.school)){
    errors.school = "个人学历的school不能为空!";
  }

  if(Validator.isEmpty(data.degree)){
    errors.degree = "个人学历的degree不能为空!";
  }

  if(Validator.isEmpty(data.fieldofstudy)){
    errors.fieldofstudy = "个人学历的fieldofstudy不能为空!";
  }

  if(Validator.isEmpty(data.from)){
    errors.from = "个人学历的from不能为空!";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
