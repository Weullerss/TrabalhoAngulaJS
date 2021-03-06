const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  nome: String,
  sobrenome: String,
  endereco: String,
  cpf: String,
  telefone: String,
});

module.exports = mongoose.model("User", userSchema);
