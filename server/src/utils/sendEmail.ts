import nodemailer from "nodemailer";
import config from "config";

const appEmail : string = config.get<string>("EMAIL");
const appPassword : string = config.get<string>("Password");

console.log(appEmail,appPassword)

async function  sendEmail(emailData : ({text?: string, subject : string , to : string,html?:string})): Promise<void> {
    try {
        if(!appEmail || !appPassword){
            console.log("Email and password is not there . ")
        }
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
              user: appEmail,
              pass: appPassword,
            },
        })
        let info = transporter.sendMail({
            from: `"Syed Omer Ali" <${appEmail}>`,
            to: emailData.to,
            subject: emailData.subject,
            text: emailData.text,
            html: emailData.html,
        })
        console.log(`✅ Email sent successfully to ${emailData.to}: ${(await info).messageId}}`)// to wait me 
    } catch (error) {
        console.log(error)
    }
}

export default sendEmail;