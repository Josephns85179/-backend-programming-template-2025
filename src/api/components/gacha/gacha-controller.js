const gachaService = require('./gacha-service');

async function yukMainGacha(input, hasil) {
  try {
    const { userId } = input.body;

    if (!userId) {
      return hasil
        .status(400)
        .json({ error: 'Masukkan user ID untuk main gacha.' });
    }

    const hasilGacha = await gachaService.yukMainGacha(userId);

    return hasil.status(200).json({
      sukses: true,
      message: 'Selamat! Anda mendapatkan hadiah.',
      data: {
        hadiah: hasilGacha.hadiahName,
        waktuMenang: hasilGacha.tanggalDibuat,
      },
    });
  } catch (error) {
    return hasil.status(400).json({ sukses: false, message: error.message });
  }
}

module.exports = {
  yukMainGacha,
};
