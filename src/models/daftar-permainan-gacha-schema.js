module.exports = (db) =>
  db.model(
    'DaftarPermainan',
    db.Schema({
      userId: { type: db.Schema.Types.ObjectId, ref: 'Users' },
      hadiahId: { type: db.Schema.Types.ObjectId, ref: 'Hadiah' },
      hadiahName: String,
      tanggalDibuat: { type: Date, default: Date.now },
    })
  );
