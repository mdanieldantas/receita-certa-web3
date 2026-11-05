const admin = "admin";

const medicos = [];

const receitas = [];

function cadastrarMedico(adminAtual, nomeMedico) {
  if (adminAtual !== admin) {
    console.log("Apenas o admin pode cadastrar médicos.");
    return;
  }

  medicos.push(nomeMedico);
  console.log(`Médico ${nomeMedico} cadastrado.`);
}

function emitirReceita(nomeMedico, idReceita, validade) {
  if (!medicos.includes(nomeMedico)) {
    console.log("Médico não autorizado.");
    return;
  }

  if (new Date(validade) <= new Date()) {
    console.log("Validade inválida.");
    return;
  }

  const receita = {
    id: idReceita,
    medico: nomeMedico,
    validade: validade,
    dispensada: false
  };

  receitas.push(receita);
  console.log(`Receita ${idReceita} emitida.`);
}

function dispensarReceita(idReceita) {
  const receita = receitas.find(r => r.id === idReceita);

  if (!receita) {
    console.log("Receita não encontrada.");
    return;
  }

  if (receita.dispensada) {
    console.log("Receita já dispensada.");
    return;
  }

  if (new Date(receita.validade) < new Date()) {
    console.log("Receita vencida.");
    return;
  }

  receita.dispensada = true;
  console.log(`Receita ${idReceita} dispensada.`);
}