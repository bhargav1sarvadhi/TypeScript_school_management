/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
import nodemailer, { Transporter } from 'nodemailer';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { logger } from '../logger/Logger';
dotenv.config();

const transporter: Transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'bhargav1.sarvadhi@gmail.com',
        pass: 'dhkchwxivwhiidcb',
    },
});

export function createToken (id){
    const token = jwt.sign({ id }, process.env.JWT_SECERET, { expiresIn: '1d' });
    return token;
}
export class Sendnotification {

    protected async sendemail(type, email) {
        let subject = '';
        let htmlContent = '';
        const token = jwt.sign({ id: email.id }, process.env.JWT_SECERET,{ expiresIn: '1d' });
        switch (type) {
            case 'invite':
                subject = 'Invitation to Our App';
                htmlContent = `
         <!DOCTYPE html>
          <html>
            <head>
              <title>${subject}</title>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  line-height: 1.6;
                }
                h1 {
                  color: #007bff;
                }
                .container {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  border: 1px solid #ccc;
                  border-radius: 5px;
                }
                .button {
                  display: inline-block;
                  background-color: #007bff;
                  color: #fff;
                  padding: 10px 20px;
                  text-decoration: none;
                  border-radius: 5px;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <h1>Invite Notification</h1>
                <p>Hello there! ${email.message}</p>
                <p>You have been invited to join our app. Click the link below to create an account.</p>
                <p>Invitation Link: <a class="button" href="${email.link}">Join Now</a></p>
                <p>Regards,</p>
                <p>Your App Team</p>
              </div>
            </body>
          </html>
        `;
                break;

            case 'message':
                subject = 'New Message Notification';
                htmlContent = `
          <!DOCTYPE html>
          <html>
            <head>
              <title>${subject}</title>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  line-height: 1.6;
                }
                h1 {
                  color: #007bff;
                }
                .container {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  border: 1px solid #ccc;
                  border-radius: 5px;
                }
                .button {
                  display: inline-block;
                  background-color: #007bff;
                  color: #fff;
                  padding: 10px 20px;
                  text-decoration: none;
                  border-radius: 5px;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <h1>Invite Notification</h1>
                <p>Hello there! ${email.message}</p>
                <p>You have been invited to join our app. Click the link below to create an account.</p>
                <p>Invitation Link: <a class="button" href="http://localhost:3000/create/${email.id}">Join Now</a></p>
                <p>Regards,</p>
                <p>Your App Team</p>
              </div>
            </body>
          </html>
        `;
                break;

            case 'celebration':
                subject = 'Celebration Notification';
                htmlContent = `
        <h1>Celebration Notification</h1>
        <p>Hello,</p>
        <p>Congratulations! We are celebrating ${email.occasion}.</p>
        <p>Regards,</p>
        <p>Your App Team</p>
      `;
                break;

            default:
                throw new Error('Invalid notification type');
        }

        const mailOptions = {
            from: 'smitlakhani2062002@gmail.com',
            to: email.emailAddress,
            subject,
            html: htmlContent,
        };

        try {
            await transporter.sendMail(mailOptions);
            logger.info(`Email sent successfully to ${email.emailAddress}`);
        } catch (error) {
            logger.error('Error sending email:', error);
        }
    }

    public async Send(type, email) {
        this.sendemail(type,email);
    }
};
