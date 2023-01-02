const { OAuth2Client } = require("google-auth-library");


const client = new OAuth2Client(process.env.GOOGLE_SIGN_CLIENT_ID);

const googleVerify = async (idToken = '') => {
  const ticket = await client.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_SIGN_CLIENT_ID,
  });
<<<<<<< HEAD
  console.log(ticket);
=======
>>>>>>> ea83182f36b12e34f74c1bd25357bd7933514132
  const {
    given_name: nombre,
    family_name: apellido,
    picture: img,
<<<<<<< HEAD
    email: email,
  } = ticket.getPayload();
=======
    email,
  } = ticket.getPayload();

>>>>>>> ea83182f36b12e34f74c1bd25357bd7933514132
  return { nombre, apellido, img, email };
};

module.exports = {
  googleVerify,
};
