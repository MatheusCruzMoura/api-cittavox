const dao = require("../../dao/reclamacaoDao");

module.exports = {
  async index(req, res) {
    const reclamacoes = await dao.getAllReclamacao();
    if (!reclamacoes) console.log("No reclamacoes");
    return res.status(200).json({ data: reclamacoes, message: "sucesso" });
  },
};
