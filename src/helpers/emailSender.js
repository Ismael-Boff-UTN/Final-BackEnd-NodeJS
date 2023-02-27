const nodemailer = require("nodeMailer");


function emailSend(nombre, apellido, email , fecha, detallesPedido , total) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAIL_EMAIL,
      pass: process.env.NODEMAIL_PASSWORD,
    },
  });

  function StringArreglo(detallesPedido){
    console.log(detallesPedido);
    var aux="";
    detallesPedido.forEach(pedido => {
      aux=aux + "<p>"+ pedido.articulo.denominacion + " x " + pedido.cantidad + "    c/u $"+ pedido.precioUnitario + "</p> </br>";
    });
    return aux
  }

  let mailOptions = {
    from: process.env.NODEMAIL_EMAIL,
    to: "ismaelbofflopez98@gmail.com",   //Aca se pasaria atributo email
    subject: "Su pedido se ha facturado",
    text: "",
    html: "<h1> Factura: </h1> </br> <p> Pedido por: " + nombre + " " + apellido + "</p> </br> <p> Fecha: " + fecha + "</p> </br> <p> Detalles: </p></br><p>" + StringArreglo(detallesPedido) + "</p> </br> <p>__________________</p> </br> <p> Total: " + total +"</p>",
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