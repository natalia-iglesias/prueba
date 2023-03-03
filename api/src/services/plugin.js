const { SMTP_HOST, SMTP_PORT, SMTP_USERNAME, SMTP_PASSWORD } = process.env;

module.exports = ({ env }) => ({
  // ...
  email: {
    provider: 'nodemailer',
    providerOptions: {
      host: 'smtp.example.com',
      port: '587',
      auth: {
        user: SMTP_USERNAME,
        pass: SMTP_PASSWORD,
      },
      // ... any custom nodemailer options
    },
    settings: {
      defaultFrom: 'verdevolver@gmail.com',
      defaultReplyTo: 'verdevolver@gmail.com',
    },
  },
});
