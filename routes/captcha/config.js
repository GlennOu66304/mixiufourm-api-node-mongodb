const phone = {
  // new sms Client credential
 

  region: "ap-guangzhou",

  // profile
  signMethod: "HmacSHA256",
  reqMethod: "POST",
  reqTimeout: 30,
  endpoint: "sms.tencentcloudapi.com",

  // smsparams

  SmsSdkAppid: "1400659704", // 应用id
  //signname is the sms's signature name
  SignName: Buffer.from("北京中比熙林", "utf-8").toString(),
  TemplateID: "1362682",
  ExtendCode: "",
  SenderId: "",

  time: 2 * 60,
};

export default phone;
