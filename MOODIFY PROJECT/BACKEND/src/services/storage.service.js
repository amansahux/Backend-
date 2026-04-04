const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

const uploadFile = async ({ buffer, fileName, folder }) => {
  try {
    const response = await client.files.upload({
      file: await toFile(Buffer.from(buffer)),
      fileName: fileName,
      folder,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

module.exports = uploadFile;
