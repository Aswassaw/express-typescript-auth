import transporter from "../config/email";

class SendEmail {
  public static send = (email: any): any => {
    return transporter
      .sendMail(email)
      .then((info) => console.log(info))
      .catch((err) => console.error(err));
  };
}

export default SendEmail;
