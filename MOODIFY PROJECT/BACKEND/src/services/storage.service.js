// const ImageKit = require("@imagekit/nodejs");
// const { toFile } = require("@imagekit/nodejs");

// const client = new ImageKit({
//   privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
// });

// const uploadFile = async ({ buffer, fileName, folder }) => {
//   try {
//     const response = await client.files.upload({
//       file: await toFile(buffer),
//       fileName: fileName,
//       folder,
//     });
//     return response;
//   } catch (error) {
//     console.log(error);
//   }
// };

// module.exports = uploadFile;


const ImageKit = require("@imagekit/nodejs");
// const { toFile } = require("@imagekit/nodejs");

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function uploadFile({ buffer, fileName, folder = "" }) {

    const file = await client.files.upload({
        file: await ImageKit.toFile(Buffer.from(buffer)),
        fileName,
        folder
    })

    return file

}

module.exports = { uploadFile }
