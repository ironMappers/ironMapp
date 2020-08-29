const nodemailer = require('nodemailer');

const host = process.env.HOST || 'http://localhost:3000';
const user = process.env.NM_USER;
const pass = process.env.NM_PASS;

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: user,
        pass: pass
    }
})

module.exports.sendValidationEmail = ({name, email, id, activationToken}) => {
    transporter.sendMail({
        to: email,
        from: `Gas Stations Project team <${user}>`,
        subject: 'Activate your acoount!',
        html: `
            <h1>Hi ${name}</h1>
            <p>Click on the button below to activate your account ❤️</p>
            <a href="${host}/users/${id}/activate/${activationToken}" style="padding: 10px 20px; color: white; background-color: pink; border-radius: 5px;">Click here</a>
        `
    })
    .then(console.log)
    .catch(console.error)

}



