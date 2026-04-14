const gachaRepository = require('./gacha-repository');

async function yukMainGacha(userId) {
  const jumlahPermainan =
    await gachaRepository.getJumlahDimainkanHariIni(userId);
  if (jumlahPermainan >= 5) {
    throw new Error('Batas melakukan gacha per hari adalah 5 kali!');
  }

  const hadiahTersedia = await gachaRepository.getHadiahYangTersedia();
  if (hadiahTersedia.length === 0) {
    throw new Error(
      'Semua hadiah sudah terklaim, mohon menunggu periode selanjutnya.'
    );
  }

  const totalJumlahHadiah = hadiahTersedia.reduce((sum, h) => sum + h.total, 0);
  let random = Math.random() * totalJumlahHadiah;

  let hadiahDimenangkan = null;
  for (const hadiah of hadiahTersedia) {
    if (random < hadiah.total) {
      hadiahDimenangkan = hadiah;
      break;
    }
    random -= hadiah.total;
  }

  const hadiahUpdated = await gachaRepository.kurangiKuotaHadiah(
    hadiahDimenangkan._id
  );

  const daftarPermainan = await gachaRepository.buatDaftarPermainan(
    userId,
    hadiahUpdated._id,
    hadiahDimenangkan.name
  );

  return {
    hadiahName: hadiahDimenangkan.name,
    tanggalDibuat: daftarPermainan.tanggalDibuat,
  };
}

module.exports = {
  yukMainGacha,
};
