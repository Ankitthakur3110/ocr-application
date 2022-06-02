const express = require("express");
const tesseract = require("tesseract.js");

const Router = express.Router();
const SUPPORTED_IMAGE_TYPES = [
  "image/bmp",
  "image/gif",
  "image/jpeg",
  "mage/pipeg",
  "image/tiff",
  "image/png",
];

const isValidImage = (file) => SUPPORTED_IMAGE_TYPES.includes(file.mimetype);

const getOCR = async (req, res) => {
  try {
    if (req.files === null) {
      return res.status(400).json({ msg: "No file uploaded" });
    }
    const file = req.files.file;

    if (!isValidImage(file)) {
      return res.status(400).json({ msg: "Format not supported" });
    }
    file.mv(`${__dirname}/images/${file.name}`, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }

      tesseract
        .recognize(`${__dirname}/images/${file.name}`, "eng")
        .then((output) => {
          res.status(200).json({ output: output.data });
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

Router.post("/uploadfile", getOCR);

module.exports = Router;
