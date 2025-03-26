import nodemailer from "nodemailer";
import config from "config";

const appEmail: string = config.get<string>("EMAIL");
const appPassword: string = config.get<string>("Password");

console.log(appEmail, appPassword);

async function sendEmail(emailData: { text?: string; subject: string; to: string; html?: string }): Promise<void> {
    try {
        if (!appEmail || !appPassword) {
            console.log("Email and password are missing.");
            return;  // ✅ Return added
        }

        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: appEmail,
                pass: appPassword,
            },
        });

        let info = await transporter.sendMail({  // ✅ Await added
            from: `"Syed Omer Ali" <${appEmail}>`,
            to: emailData.to,
            subject: emailData.subject,
            text: emailData.text,
            html: emailData.html,
        });

       // Yaha await wait karega email sent hone tak
       console.log(`✅ Email sent successfully to ${emailData.to}: ${(await info).messageId}`);
    } catch (error) {
        console.log(error);
    }
}

export default sendEmail;
