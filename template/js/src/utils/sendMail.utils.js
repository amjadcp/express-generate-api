import axios from "axios";
import { appConfig } from "./env.utils.js";

export const sendEmail = async (mailData) => {
  try {
    const headers = {
      accept: "application/json",
      "content-type": "application/json",
      "api-key": appConfig.sibKey,
    };
    // eslint-disable-next-line prefer-const
    let { to, htmlBody, subject } = mailData;
    if(typeof to === "string"){
      to = [to];
    }
    
    const _to = to.map((email)=>{
      return { email };
    });
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          email: appConfig.sibSource,
        },
        to: _to,
        subject,
        htmlContent: htmlBody,
      },
      {
        headers,
      },
    );

    console.log("email successfully sent", response);
    return true;
  } catch (err) {
    console.log(err, "error");
    return false;
  }
};