const express = require('express');

const gachaController = require('./gacha-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/gacha', route);
  route.post('/', gachaController.yukMainGacha);
  route.post('/histori', gachaController.lihatHistori);
  route.get('/daftarhadiah', gachaController.getDaftarHadiah);
};
