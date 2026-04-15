const { Hadiah, DaftarPermainan } = require('../../../models');

async function getHadiahYangTersedia() {
  return Hadiah.find({ kuota: { $gt: 0 } });
}

async function getJumlahDimainkanHariIni(userId) {
  const awalHari = new Date();
  awalHari.setHours(0, 0, 0, 0);

  const akhirHari = new Date();
  akhirHari.setHours(23, 59, 59, 999);

  return DaftarPermainan.countDocuments({
    userId,
    tanggalDibuat: { $gte: awalHari, $lte: akhirHari },
  });
}

async function kurangiKuotaHadiah(hadiahId) {
  return Hadiah.findOneAndUpdate(
    { _id: hadiahId, kuota: { $gt: 0 } },
    { $inc: { kuota: -1 } },
    { new: true }
  );
}

async function createDaftarPermainan(userId, hadiahId, hadiahName) {
  return DaftarPermainan.create({
    userId,
    hadiahId,
    hadiahName,
    tanggalDibuat: new Date(),
  });
}

async function getHistoriUser(userId) {
  return DaftarPermainan.find(
    { userId },
    { hadiahName: 1, tanggalDibuat: 1, _id: 0 }
  ).sort({ tanggalDibuat: -1 });
}

async function getDaftarHadiah() {
  return Hadiah.find({}, { name: 1, kuota: 1, _id: 0 });
}

module.exports = {
  getHadiahYangTersedia,
  getJumlahDimainkanHariIni,
  kurangiKuotaHadiah,
  createDaftarPermainan,
  getHistoriUser,
  getDaftarHadiah,
};
