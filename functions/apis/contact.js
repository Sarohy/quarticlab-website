let aws = require("aws-sdk");
import { apiResponse } from "../utils/apiResponse";
var ses = new aws.SES();

export const contact = async (event, context, callback) => {
  try {
    let eventBody = JSON.parse(event.body);
    if (!eventBody.name) {
      return apiResponse(400, "Name is required field.");
    }
    if (!eventBody.email) {
      return apiResponse(400, "Email is required field.");
    }
    if (!eventBody.phone_number) {
      return apiResponse(400, "Phone is required field.");
    }
    if (!eventBody.country) {
      return apiResponse(400, "Country is required field.");
    }
    if (!eventBody.des) {
      return apiResponse(400, "Description is required field.");
    }
    let data = `Name : ${eventBody.name}\nEmail : ${eventBody.email}\nPhone: ${eventBody.phone_number}\nCountry: ${eventBody.country}\nShort Description: ${eventBody.des}`;
    let params = {
      Destination: {
        ToAddresses: ["ali.zain@zweidevs.com", "abdul.rehman@zweidevs.com"],
      },
      Message: {
        Body: {
          Text: {
            Data: data,
          },
        },

        Subject: { Data: "Need Quotation" },
      },
      Source: "contact@zweidevs.com",
    };
    await ses.sendEmail(params).promise();
    return apiResponse(200, {});
  } catch (err) {
    console.log("Error in submiting new quotation", err);
    return apiResponse(400, err);
  }
};
