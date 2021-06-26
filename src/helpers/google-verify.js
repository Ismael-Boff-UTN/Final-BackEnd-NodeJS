const { OAuth2Client } = require("google-auth-library");


const client = new OAuth2Client(process.env.GOOGLE_SIGN_CLIENT_ID);

const googleVerify = async (idToken = '') => {
  const ticket = await client.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_SIGN_CLIENT_ID,
  });
  const {
    given_name: nombre,
    family_name: apellido,
    picture: img,
    email,
  } = ticket.getPayload();

  return { nombre, apellido, img, email };
};

module.exports = {
  googleVerify,
};
