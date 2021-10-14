const UserModel = require("../models/user.model");
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline); // Permet de créer un fichier
const { uploadErrors } = require("../utils.js/errors.utils");
const aws = require("aws-sdk");
const multer = require("multer"); // npm i -s multer || npm i multer@2.0.0-rc.1
const multerS3 = require("multer-s3");
require("dotenv").config({ path: "../config/.env" }); // Cacher données
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
const { uploadFile } = require("../s3");

module.exports.uploadProfil = async (req, res) => {
  const file = req.file;
  console.log(file);
  const fileResult = await uploadFile(file);
  await unlinkFile(file.path);
  try {
    await UserModel.findByIdAndUpdate(
      req.body.userId,
      { $set: { profilePicture: fileResult.Location } },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) return res.status(200).json({ data: docs });
        else
          return res.status(400).json({ success: false, message: err.message });
      }
    );
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

module.exports.uploadCover = async (req, res) => {
  const file = req.file;

  const fileResult = await uploadFile(file);
  await unlinkFile(file.path);
  try {
    await UserModel.findByIdAndUpdate(
      req.body.userId,
      { $set: { coverPicture: fileResult.Location } },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) return res.status(200).json({ data: docs });
        else
          return res.status(400).json({ success: false, message: err.message });
      }
    );
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

// module.exports.uploadProfil = async (req, res) => {
// try {
//   if (
//     req.file.detectedMimeType !== "image/jpg" &&
//     req.file.detectedMimeType !== "image/png" &&
//     req.file.detectedMimeType !== "image/jpeg"
//   )
//     throw Error("invalid file");

//   if (req.file.size > 500000) throw Error("max size");
// } catch (err) {
//   const errors = uploadErrors(err);
//   return res.status(201).json({ errors });
// }

// const fileName = req.body.userId;
// const fileS3 = await uploadFile(req.file, fileName);
// console.log(fileS3);
// res.send({ imagePath: `/${fileS3.Key}` });

// await pipeline(
//   req.file.stream,
//   fs.createWriteStream(
//     `${__dirname}/../client/public/uploads/profil/${fileName}`
//   )
// );

// try {
//   await UserModel.findByIdAndUpdate(
//     req.body.userId,
//     { $set: { profilePicture: "/images/" + fileS3.Key } },
//     { new: true, upsert: true, setDefaultsOnInsert: true },
//     (err, docs) => {
//       if (!err) return res.send(docs);
//       else return res.status(500).send({ message: err });
//     }
//   );
// } catch (err) {
//   return res.status(500).send({ message: err });
// }
// };

// module.exports.uploadCover = async (req, res) => {
//   try {
//     if (
//       req.file.detectedMimeType !== "image/jpg" &&
//       req.file.detectedMimeType !== "image/png" &&
//       req.file.detectedMimeType !== "image/jpeg"
//     )
//       throw Error("invalid file");

//     if (req.file.size > 500000) throw Error("max size");
//   } catch (err) {
//     const errors = uploadErrors(err);
//     return res.status(201).json({ errors });
//   }

//   const fileName = req.body.name + ".jpg";

//   await pipeline(
//     req.file.stream,
//     fs.createWriteStream(
//       `${__dirname}/../client/public/uploads/cover/${fileName}`
//     )
//   );

//   try {
//     await UserModel.findByIdAndUpdate(
//       req.body.userId,
//       { $set: { coverPicture: "../uploads/cover/" + fileName } },
//       { new: true, upsert: true, setDefaultsOnInsert: true },
//       (err, docs) => {
//         if (!err) return res.send(docs);
//         else return res.status(500).send({ message: err });
//       }
//     );
//   } catch (err) {
//     return res.status(500).send({ message: err });
//   }
// };
