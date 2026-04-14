module.exports = (db) =>
  db.model(
    'Hadiah',
    db.Schema({
      name: String,
      kuota: Number,
      total: Number,
    })
  );
