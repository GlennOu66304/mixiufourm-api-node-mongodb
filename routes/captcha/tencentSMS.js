import tencentcloud from "tencentcloud-sdk-nodejs";
import phoneConfig from "./config.js";
import dotenv from "dotenv";
dotenv.config();
// const secretId = process.env.
// send sms
export const sendSms = (phoneNo, phoneCode) => {
  // model
  const smsClient = tencentcloud.sms.v20210111.Client;

  // client credientional
  const client = new smsClient({
    // credential
    credential: {
      secretId: process.env.SECRET_ID,
      secretKey: process.env.SECRET_KEY,
    },

    region: phoneConfig.region,
    // profile
    profile: {
      httpProfile: {
        reqMethod: phoneConfig.reqMethod,
        reqTimeout: phoneConfig.reqTimeout,
        endpoint: phoneConfig.endpoint,
      },
    },
  });

  // paramas
  const smsParams = {
    PhoneNumberSet: [`+86${phoneNo}`],
    SmsSdkAppId: phoneConfig.SmsSdkAppid,
    SignName: "北京中比熙林",
    TemplateId: "1362682",
    TemplateParamSet: [phoneCode],
  };

  // promise handle the request to the tencent cloud
  return new Promise((resolve, reject) => {
    //   send sms
    client.SendSms(smsParams, (err, response) => {
      // failed send sms
      if (err) {
        reject({
          code: 102,
          info: "get_fail",
          data: {
            info: "操作失败！",
            detail: err,
          },
        });
      }
      // send success
      resolve({
        code: 200,
        info: "get_succ",
        data: {
          info: "操作成功!",
          response,
        },
      });
    });
  });
};

export const check = (req, res) => {};
