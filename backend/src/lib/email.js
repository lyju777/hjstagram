import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'jeynpyo@gmail.com',
        pass: 'jane1994!@'
    },
});

export const getPasswordResetURL = (user, token) => 
`http://localhost:3000/update-password/${user._id}/${token}`;

export const resetPasswordTemplate = (user, url) => {
    const from = 'hjstagram'
    const to = user.email
    const subject = "๐งhjstagram ๋น๋ฐ๋ฒํธ ์ฌ์ค์  ๋งํฌ"
    const html = `
    <p>์๋ํ์ธ์ ${user.name || user.email}๋</p>
    <p>๋น๋ฐ๋ฒํธ ์ฌ์ค์ ์ ์ํ ๋งํฌ๋ฅผ ๋ฉ์ผ๋ก ๋ณด๋ด๋๋ ธ์ต๋๋ค.</p>
    <a href=${url}>${url}</a>
    <p>-hjstagram-</p>
    `
    return { from, to, subject, html }
  }