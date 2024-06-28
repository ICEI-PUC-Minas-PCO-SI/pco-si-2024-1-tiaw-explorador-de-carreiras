document.addEventListener('DOMContentLoaded', function() {
    carregarCursos();

    document.getElementById('botao-pesquisa').addEventListener('click', function() {
        const cursoSelecionado = document.getElementById('pesquisa-curso').value;
        if (cursoSelecionado) {
            const cursoValido = validarCurso(cursoSelecionado);
            if (cursoValido) {
                redirecionarParaDetalhesCurso(cursoSelecionado);
            } else {
                alert('Por favor, selecione um curso válido.');
            }
        } else {
            alert('Por favor, selecione um curso.');
        }
    });

    document.getElementById('home-button').addEventListener('click', function() {
        window.location.href = 'index.html';
    });
});

function carregarCursos() {
    
    const cursos = ["Administração", "Ciências Contábeis", "Tecnologia em Gestão Comercial", "Tecnologia em Gestão de Produção Industrial", "Tecnologia em Gestão da Tecnologia da Informação", "Tecnologia em Gestão de Recursos Humanos", "Tecnologia em Gestão Financeira", "Tecnologia em Marketing", "Matemática", "Análise e Desenvolvimento de Sistemas", "Ciência da Computação", "Engenharia da Computação", "Engenharia de Controle e Automação", "Engenharia de Software", "Sistemas de Informação", "Tecnologia em Bancos de Dados", "Jogos Digitais", "Arquitetura e Urbanismo", "Engenharia Aeronáutica", "Engenharia Civil", "Engenharia Elétrica", "Engenharia Mecânica", "Engenharia Mecatrônica", "Engenharia Química", "Biomedicina", "Ciências Biológicas", "Enfermagem", "Farmácia", "Fisioterapia", "Fonoaudiologia", "Medicina Veterinária", "Medicina", "Nutrição", "Odontologia", "Ciências Econômicas", "Ciências Sociais", "Cinema e Audiovisual", "Direito", "Filosofia", "Geografia", "História", "Jornalismo", "Letras", "Pedagogia", "Psicologia", "Publicidade e Propaganda", "Relações Internacionais", "Relações Públicas", "Teologia"];
    const cursosDatalist = document.getElementById('cursos');
    cursos.forEach(curso => {
        const option = document.createElement('option');
        option.value = curso;
        cursosDatalist.appendChild(option);
    });
}

function validarCurso(cursoSelecionado) {
    const cursosValidos = ["Administração", "Ciências Contábeis", "Tecnologia em Gestão Comercial", "Tecnologia em Gestão de Produção Industrial", "Tecnologia em Gestão da Tecnologia da Informação", "Tecnologia em Gestão de Recursos Humanos", "Tecnologia em Gestão Financeira", "Tecnologia em Marketing", "Matemática", "Análise e Desenvolvimento de Sistemas", "Ciência da Computação", "Engenharia da Computação", "Engenharia de Controle e Automação", "Engenharia de Software", "Sistemas de Informação", "Tecnologia em Bancos de Dados", "Jogos Digitais", "Arquitetura e Urbanismo", "Engenharia Aeronáutica", "Engenharia Civil", "Engenharia Elétrica", "Engenharia Mecânica", "Engenharia Mecatrônica", "Engenharia Química", "Biomedicina", "Ciências Biológicas", "Enfermagem", "Farmácia", "Fisioterapia", "Fonoaudiologia", "Medicina Veterinária", "Medicina", "Nutrição", "Odontologia", "Ciências Econômicas", "Ciências Sociais", "Cinema e Audiovisual", "Direito", "Filosofia", "Geografia", "História", "Jornalismo", "Letras", "Pedagogia", "Psicologia", "Publicidade e Propaganda", "Relações Internacionais", "Relações Públicas", "Teologia"];
    return cursosValidos.includes(cursoSelecionado);
}

function redirecionarParaDetalhesCurso(cursoSelecionado) {
    window.location.href = `index2.html?curso=${encodeURIComponent(cursoSelecionado)}`;
    
}