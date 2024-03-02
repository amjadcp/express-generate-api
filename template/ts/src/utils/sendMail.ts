import axios from "axios";
import { sendMailData } from "../interface/app.interface";
import { appConfig } from "../config/appConfig";

export const sendEmail = async (mailData: sendMailData): Promise<boolean> => {
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
    
    const _to: {email: string}[] = to.map((email)=>{
      return { email };
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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