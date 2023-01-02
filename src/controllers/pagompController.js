const { response } = require("express");
const mercadopago = require('mercadopago');

mercadopago.configure({
    access_token: 'TEST-359702488802332-110617-1827c3c7bf4214710cc8dcdc10d14fca-136098123'
});

const postPagoMP = async (req, res = response) => {
  try {
    const { items } = req.body;

    
    var preference = {
items
    };
    
    const response=await mercadopago.preferences.create(preference)
   /*  const msg=items.map(it=>
        `pago : ${it.quantity} ${it.title} de $${it.unit_price}, Realizado!`
    )
    res.status(200).json({
        status: true,
        msg: msg.join(','),
      }); */
      res.redirect(response.body.init_point)
    }
   catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

module.exports = {
  postPagoMP,
};
