const nodemailer = require('nodemailer');

const sendVdVFormEmail = async (name, mail) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'verdevolver2@gmail.com',
      pass: 'ioiolsykzqzfwday',
    },
  });

  await transporter.sendMail(
    {
      from: 'verdevolver@gmail.com',
      to: `${mail}`,
      subject: 'Recibimos tu formulario 💚',
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
            <h2>Gracias por completar nuestro formulario.</h2>
            <p>Los administradores revisarán tu solicitud cuidadosamente.</p>
            <p>Recibirás una respuesta en los próximos días!</p>
            <p>Que tengas muy buen día,</p>
            <p>Equipo de Verde Volver</p>
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
        console.log('Email sent: ', info.response);
      }
    }
  );
};

module.exports = {
  sendVdVFormEmail,
};
