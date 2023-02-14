const { response } = require("express");
const mercadopago = require('mercadopago');


mercadopago.configure({ access_token: process.env.MERCADOPAGO_KEY });


const postPagoMP = async (req, res) => {
    const producto = req.body;
    console.log(producto );
    let preference = {
        items: [{
            id: producto._id,
            title: producto.denominacion,
            currency_id: "ARS",
            picture_url: producto.imagen,
            description: "Compra Buen Sabor Restourante",
            catergory_id: producto.categoria,
            quantity: 1, //producto.cantidad,
            unit_price: producto.precioVenta,


        }],
        back_urls: {
            success: "http://localhost:3001",
            failure: "",
            pending: "",
        }, auto_return: "approved",
        binary_mode: true,


    }

    mercadopago.preferences.create(preference).then((response)=> res.status(200).send({response})).catch((error)=>res.status(400).send({error: error.message}));


}




module.exports = {
    postPagoMP,
};
