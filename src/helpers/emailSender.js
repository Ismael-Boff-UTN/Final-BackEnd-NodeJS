const nodemailer = require("nodeMailer");
const config = require("../private/emailData.json");

function emailSend(nombre, apellido, email , fecha, detallesPedido , total) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: config.email,
      pass: config.password,
    },
  });

  let mailOptions = {
    from: config.email,
    to: "francodellinocente@gmail.com",
    subject: "Su pedido se ha facturado",
    text: "",
    html: "<h1> Factura: </h1> </br> <p> Pedido por: " + nombre + " " + apellido + "</p> </br> <p> Fecha: " + fecha + "</p> </br> <p> detalles: " + detallesPedido + "</p> </br> <p>__________________</p> </br> <p> Total: " + total +"</p>",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Correo enviado: " + info.response);
    }
  });
}

module.exports = emailSend;