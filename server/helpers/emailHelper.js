const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (email, subject, text) => {
    const msg = {
        to: email,
        from: 'pinnedorg@gmail.com',
        subject: subject,
        text: text,
    };

    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent');
        })
        .catch((error) => {
            console.error(error);
        });
}

module.exports = { sendEmail };