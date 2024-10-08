const Contato = require("../models/ContatoModel");

//Decide qual view será redenrizada
exports.index = async (req, res) => {
  const contatos = await Contato.buscaContatos();
  res.render("index", { contatos });
};
