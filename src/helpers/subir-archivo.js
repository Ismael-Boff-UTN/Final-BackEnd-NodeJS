//Autenticacion Cloudinary

const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const subirImagenCloudinary = async (img, carpeta = "") => {
  imgLink = await cloudinary.uploader.upload(img, {
    folder: `${carpeta}`,
  });

  return imgLink.secure_url;
};

module.exports = {
  subirImagenCloudinary,
};
