const {
  cadastrarMedico,
  emitirReceita,
  dispensarReceita
} = require("./receitaMedica");

cadastrarMedico("admin", "João");

const validade = new Date();
validade.setDate(validade.getDate() + 7);

emitirReceita("João", "receita-001", validade);

dispensarReceita("receita-001");

dispensarReceita("receita-001");