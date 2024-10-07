//Funcao do models = trabalhar com dados, tudo referente a dados ou a base de dados em si
const mongoose = require("mongoose");
const validator = require("validator");

const ContatoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  sobrenome: { type: String, default: "" },
  email: { type: String, default: "" },
  telefone: { type: String, default: "" },
  criadoEm: { type: Date, default: Date.now },
});

const ContatoModel = mongoose.model("Contato", ContatoSchema);

function Contato(body) {
  this.body = body;
  this.errors = [];
  this.contato = null;
}

Contato.prototype.register = async function () {
  this.valida();
  if (this.errors.length > 0) return;
  this.contato = await ContatoModel.create(this.body);
};
Contato.prototype.valida = function () {
  //Validação
  this.cleanUp();
  if (this.body.email && !validator.isEmail(this.body.email))
    this.errors.push("E-mail inválido");
  if (!this.body.nome) this.errors.push("Nome é um campo obrigatório.");
  if (!this.body.email && !this.body.telefone)
    this.errors.push(
      "Pelo menos uma forma de contato precisa ser enviada: E-mail ou Telefone"
    );
};
Contato.prototype.cleanUp = function () {
  for (const key in this.body) {
    if (typeof this.body[key] !== "string") {
      this.body[key] = "";
    }
  }

  this.body = {
    nome: this.body.nome,
    sobrenome: this.body.sobrenome,
    email: this.body.email,
    telefone: this.body.telefone,
  };
};
module.exports = Contato;
