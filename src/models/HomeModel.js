//Funcao do models = trabalhar com dados, tudo referente a dados ou a base de dados em si
const mongoose = require("mongoose");

const HomeSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descricao: String,
});

const HomeModel = mongoose.model("Home", HomeSchema);

class Home {}

module.exports = Home;
