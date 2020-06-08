const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  nome: String,
  sobrenome: String,
  endereco: String,
  cpf: Number,
  telefone: Number,
});

module.exports = mongoose.model("User", userSchema);
