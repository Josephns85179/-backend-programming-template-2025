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
    tanggalDibuat: {
      $gte: awalHari,
      $lte: akhirHari,
    },
  });
}

async function kurangiKuotaHadiah(hadiahId) {
  return Hadiah.findOneAndUpdate(
    { _id: hadiahId, kuota: { $gt: 0 } },
    { $inc: { kuota: -1 } },
    { new: true }
  );
}

async function buatDaftarPermainan(userId, hadiahId, hadiahName) {
  return DaftarPermainan.create({
    userId,
    hadiahId,
    hadiahName,
    tanggalDibuat: new Date(),
  });
}

module.exports = {
  getHadiahYangTersedia,
  getJumlahDimainkanHariIni,
  kurangiKuotaHadiah,
  buatDaftarPermainan,
};
