const { Readable } = require("stream");
const cloudinary = require("cloudinary").v2;
const { v4: uuidv4 } = require("uuid");
const {
  cdnryCloudName,
  cdnryApiKey,
  cdnryApiSecret,
} = require("../config/keys");

cloudinary.config({
  cloud_name: cdnryCloudName,
  api_key: cdnryApiKey,
  api_secret: cdnryApiSecret,
  secure: true,
});

function bufferToStream(binary) {
  const readableInstanceStream = new Readable({
    read() {
      this.push(binary);
      this.push(null);
    },
  });

  return readableInstanceStream;
}

function streamUpload(buffer, folderName) {
  return new Promise((res, rej) => {
    let stream = cloudinary.uploader.upload_stream(
      {
        public_id: `${folderName}/${uuidv4()}`,
      },
      (error, result) => {
        if (error) {
          rej(error);
        } else {
          res(result);
        }
      }
    );
    bufferToStream(buffer).pipe(stream);
  });
}

let fileDelete = (public_id) => {
  return new Promise((res, rej) => {
    cloudinary.api.delete_resources(public_id, (error, result) => {
      if (error) rej(error);
      else res(result);
    });
  });
};

module.exports = { streamUpload, fileDelete };
