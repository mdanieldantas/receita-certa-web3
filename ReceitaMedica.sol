
pragma solidity 0.8.20;

// Contrato  para registrar receitas médicas.
contract ReceitaMedica {
    // Quem criou o contrato.
    address public admin;

    // Dados da receita.
    struct Receita {
        address medico;
        uint validade;
        bool dispensada;
    }

    // Guarda as receitas pelo ID.
    mapping(bytes32 => Receita) public receitas;

    // Guarda os médicos autorizados.
    mapping(address => bool) public medicosAutorizados;

    // Quem cria o contrato vira o admin.
    constructor() {
        admin = msg.sender;
    }

    // O admin cadastra um médico.
    function cadastrarMedico(address medico) public {
        require(msg.sender == admin, "Apenas o admin pode cadastrar medicos.");
        medicosAutorizados[medico] = true;
    }

    // O medico emite uma receita.
    function emitirReceita(bytes32 idReceita, uint validade) public {
        require(medicosAutorizados[msg.sender], "Medico nao autorizado.");
        require(validade > block.timestamp, "Validade invalida.");

        receitas[idReceita] = Receita(msg.sender, validade, false);
    }

    // A farmacia dispensa a receita.
    function dispensarReceita(bytes32 idReceita) public {
        Receita storage receita = receitas[idReceita];

        require(receita.medico != address(0), "Receita nao encontrada.");
        require(block.timestamp <= receita.validade, "Receita vencida.");
        require(!receita.dispensada, "Receita ja dispensada.");

        receita.dispensada = true;
    }
}