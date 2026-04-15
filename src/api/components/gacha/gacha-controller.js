const gachaService = require('./gacha-service');

async function yukMainGacha(request, response, next) {
  try {
    const { userId } = request.body;

    if (!userId) {
      return response.status(400).json({
        error:
          'userId tidak ditemukan, dapatkan melalui method get pada endpoint /users.',
      });
    }

    const responseGacha = await gachaService.yukMainGacha(userId);

    return response.status(200).json({
      selamat: 'Anda mendapatkan hadiah!',
      hadiah: responseGacha.hadiahName,
      waktuMenang: responseGacha.tanggalDibuat,
    });
  } catch (error) {
    return next(error);
  }
}

async function lihatHistori(request, response, next) {
  try {
    const { userId } = request.body;

    if (!userId) {
      return response.status(400).json({
        error:
          'userId tidak ditemukan, dapatkan melalui method get pada endpoint /users.',
      });
    }

    const daftarHadiah = await gachaService.getHistori(userId);

    return response.status(200).json({
      daftarHadiahUser: daftarHadiah,
    });
  } catch (error) {
    return next(error);
  }
}

async function getDaftarHadiah(request, response, next) {
  try {
    const daftar = await gachaService.getDaftarHadiah();

    return response.status(200).json({ daftarHadiahGacha: daftar });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  yukMainGacha,
  lihatHistori,
  getDaftarHadiah,
};
