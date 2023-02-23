const { response } = require("express");
const mercadopago = require('mercadopago');


mercadopago.configure({ access_token: process.env.MERCADOPAGO_KEY });


const postPagoMP = async (req, res) => {
    const producto = req.body;


    itemsCarro = [];

    producto.forEach((item) => {

        itemsCarro.push(
            {
                id: item._id,
                quantity: 1,
                description: "Compra Buen Sabor Restourante",
                currency_id: "ARS",
                description: item.denominacion,
                imagen: item.imagen,
                category: item.categoria,
                unit_price: item.precioVenta
            })
    });





    let preference = {


        items: itemsCarro,


        back_urls: {
            success: "http://localhost:3002/mp-successpayment",
            failure: "",
            pending: "",
        },
        binary_mode: true,


    }

    mercadopago.preferences.create(preference).then((response) => res.status(200).send({ response })).catch((error) => res.status(400).send({ error: error.message }));


}




module.exports = {
    postPagoMP,
};
