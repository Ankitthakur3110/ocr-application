const Tess = require('tesseract.js');

const getOCR = async (req, res) => {
    console.log('yeh toh chal gya mere bhai');
    Tess.recognize('./Controllers/image.jpg', 'eng', { logger: e => console.log('these are logs ', e)})    
    .then(output => console.log(output.data.text,'this is final data', res.status(200).json({data: output.data.text})));

}


module.exports = {
    getOCR
}