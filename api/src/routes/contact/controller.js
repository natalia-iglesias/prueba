const nodemailer = require('nodemailer');
const { Contact } = require('../../db.js');
const { SMTP_PASSWORD } = process.env;

const sendEmail = (name, mail, description) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'verdevolver2@gmail.com',

      //pass: SMTP_PASSWORD,

      pass: 'ioiolsykzqzfwday',

    },
  });

  transporter.sendMail(
    {
      from: 'verdevolver2@gmail.com',
      to: `${mail}`,
      subject: 'Gracias por contactarte con nosotros 💚',
      text: '',
      html: `
      
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>VerdeVolver</title>
        <style type="text/css">
          .main_container{
            background-color: #E1FFEB;
            width: 85%;
            heigth:200px;
            text-align: center;
            align-items: center;
            border-radius: 5px;
          }

          img { 
            height: auto; 
            width: 75%; 
            margin: 30px;
            border-radius: 5px;
          }
       
          h1 {
            font-size: 35px; 
            color: black; 
            font-family: Verdana;
          }

          h2 {
            font-size: 25px; 
            color: black; 
            font-family: Verdana;
            margin-bottom: 5px;
          }

          p { 
            color: black; 
            font-family: Verdana;
            font-weight: 500; 
            font-size: 15px; 

          }
          .image_container {
            width: 100%;
          }
        </style>
      </head>
      <body>
        <div class="main_container">
          <div class="image_container">
            <img alt="logo-vdv" src="cid:vdv@Logo" class="header" />
          </div>
          <div class="text_container">
            <h1>Hola ${name}, </h1>
            <h2>Gracias por comunicarte con Verdevolver.</h2>
            <p>Hemos recibido el siguiente mensaje: ${description}.</p>
            
            <p>En el menor tiempo nos comunicaremos contigo!</p>
            <img alt="fondo-vdv" src="cid:vdv@Fondo" />
          </div>
        </div>
      </body>
      
              `,
      disableUrlAccess: false,
      attachments: [
        {
          filename: 'Header_Mail_pblyyo.png',
          path: 'https://res.cloudinary.com/verdevolver/image/upload/v1677343466/Header_Mail_pblyyo.png',
          cid: 'vdv@Logo',
        },
        {
          filename: 'Fondo2_zstsxi.png',
          path: 'https://res.cloudinary.com/verdevolver/image/upload/v1677345555/Fondo2_zstsxi.png',
          cid: 'vdv@Fondo',
        },
      ],
    },
    (error, info) => {
      if (error) {
        throw Error('An error has ocurred');
      } else {
        console.log('Email sent:sssss ', info.response);
      }
    }
  );
};

const postComments = async (name, mail, description) => {
  await Contact.create({ name, mail, description });

  sendEmail(name, mail, description);

  return 'Se ha enviado el mensaje con exito';
};

const allComents = async () => {
  const getAllComents = await Contact.findAll();
  return getAllComents;
};

module.exports = {
  postComments,
  allComents,
};
