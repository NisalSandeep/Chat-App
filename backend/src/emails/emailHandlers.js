import { resendClient, sender } from "../lib/resend.js"
import { createWelcomeEmailTemplate } from "../emails/emailTemplates.js";


export const sendWelcomeEmail = async (email, name, clientURL) => {
    const {data, error} = await resendClient.emails.send({
        from:`${sender.name} <${sender.email}>`,
        to: email,
        subject: "Welcome to Chat-App!",
        html: createWelcomeEmailTemplate(name, clientURL)
    });

    if(error){
        console.log(error);
        throw new Error("failed to send welcome email");
    }

    console.log("Email send successfully", data);
     
}