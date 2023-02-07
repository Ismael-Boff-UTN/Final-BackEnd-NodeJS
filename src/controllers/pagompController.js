const { response } = require("express");
const mercadopago = require('mercadopago');

mercadopago.configure({
    access_token: 'TEST-359702488802332-110617-1827c3c7bf4214710cc8dcdc10d14fca-136098123'
});

const postPagoMP = async (req, res = response) => {
    const { itemes } = req.body.items;

    /* 
    Probando si hay que mapearlo a los productos
    var prueba = itemes || [];
    var art=[];
    var arti;
    prueba.forEach((iten) => {
      arti= {id:iten._id,
        title: iten.articulo.denominacion,
        currency_id: 'ARS',
        picture_url:iten.articulo.imagen,
        quantity: iten.cantidad,
        unit_price: iten.precioUnitario,
        description: "description",
        category_id: iten.articulo.categoria,
      }
      art.push(arti)
    }); */
    console.log(req.body.items);
    let preference = {
      items: [{
        id:itemes._id,
        title: itemes.articulo.denominacion,
        currency_id: 'ARS',
        picture_url:itemes.articulo.imagen,
        quantity: itemes.cantidad,
        unit_price: itemes.precioUnitario,
        description: "description",
        category_id: itemes.articulo.categoria,
      }],
      back_urls:{
        success: '',
        failure: '',
        pending: '',
      },
      auto_return: 'approved',
      bynare_mode: true,
    };
    
    mercadopago.preferences.create(preference)
    .then((response)=>res.status(200).send({response}))
    .catch((error)=>res.status(400).send({error: error.message}))
    /* const msg=itemes.map(it=>
        `pago : ${it.quantity} ${it.title} de $${it.unit_price}, Realizado!`
    )
    res.status(200).json({
        status: true,
        msg: msg.join(','),
      }); 
      res.redirect(response.body.init_point)
    }
   catch (error) {
    console.log(error);
    res.status(400).json({ error });
  } */

};
module.exports = {
  postPagoMP,
};
