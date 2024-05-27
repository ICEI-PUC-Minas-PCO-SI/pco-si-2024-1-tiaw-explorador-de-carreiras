var indicePerguntaAtual = 0;
var totalPerguntas = 0;
var questionsData = null;
var scores = {
    "1": 0,
    "2": 0,
    "3": 0,
    "4": 0,
    "5": 0
};
var respostasSelecionadas = []; // Armazena as respostas selecionadas

function carregarJSON() {
    fetch('/codigo/db.json')
        .then((response) => response.json())
        .then((data) => {
            questionsData = data.questions;
            totalPerguntas = questionsData.length;
            exibirPergunta(indicePerguntaAtual);
        })
        .catch((error) =>
            console.error('Erro ao carregar o arquivo JSON:', error)
        );
}

function exibirPergunta(indice) {
    var pergunta = questionsData[indice];
    var perguntaElemento = document.getElementById('pergunta');
    var respostaElemento = document.getElementById('respostas');
    var mostradorPerguntaElemento = document.getElementById('mostradorPergunta');

    perguntaElemento.textContent = pergunta.questao;
    respostaElemento.innerHTML = '';

    pergunta.respostas.forEach((resposta) => {
        var chave = Object.keys(resposta)[0];
        var respostaButton = document.createElement('button');
        respostaButton.textContent = resposta[chave];
        respostaButton.value = chave;
        respostaButton.onclick = function () {
            selecionarResposta(resposta[chave], pergunta.respostas);
        };
        respostaElemento.appendChild(respostaButton);
    });

    // Atualizar o mostrador de perguntas no formato X/Y
    mostradorPerguntaElemento.textContent = `${indice + 1}/${totalPerguntas}`;

    // Mostrar o botão "Voltar" somente se não estiver na primeira pergunta
    var voltarButton = document.getElementById('voltar');
    voltarButton.style.display = indice === 0 ? 'none' : 'inline-block';
    if (indice === 0) {
        seta.style.display = 'none'; // Ocultar a seta
        seta.onclick = null; // Desabilitar o clique na seta
    } else {
        seta.style.display = 'inline'; // Exibir a seta
        seta.onclick = function () {
            voltarPergunta(); // Chamar a função de voltar pergunta
        };
    }
}


function selecionarResposta(respostaSelecionada, respostas) {
    console.log('Resposta selecionada:', respostaSelecionada);

    // Armazenar a resposta selecionada
    respostasSelecionadas[indicePerguntaAtual] = respostaSelecionada;

    // Encontrar a resposta selecionada e somar os valores
    respostas.forEach((resposta) => {
        var chave = Object.keys(resposta)[0];
        if (resposta[chave] === respostaSelecionada) {
            resposta.Valor.forEach((valor) => {
                var area = Object.keys(valor)[0];
                scores[area] += valor[area];
            });
        }
    });

    proximaPergunta();
}

function proximaPergunta() {
    indicePerguntaAtual++;
    if (indicePerguntaAtual < totalPerguntas) {
        exibirPergunta(indicePerguntaAtual);
    } else {
        exibirResultado();
    }
}

function voltarPergunta() {
    if (indicePerguntaAtual > 0) {
        // Subtrair os valores da resposta selecionada anteriormente
        var respostaAnterior = respostasSelecionadas[indicePerguntaAtual - 1];
        var respostas = questionsData[indicePerguntaAtual - 1].respostas;

        respostas.forEach((resposta) => {
            var chave = Object.keys(resposta)[0];
            if (resposta[chave] === respostaAnterior) {
                resposta.Valor.forEach((valor) => {
                    var area = Object.keys(valor)[0];
                    scores[area] -= valor[area];
                });
            }
        });

        indicePerguntaAtual--;
        exibirPergunta(indicePerguntaAtual);
    }
}

function exibirResultado() {
    var areas = {
        "1": "Gestão e Administração",
        "2": "Ciências Exatas",
        "3": "Tecnologia da Informação",
        "4": "Ciências Biológicas",
        "5": "Ciências Humanas"
    };

    var resultado = "Resultados:\n";
    var totalPontos = totalPerguntas * 100;

    for (var area in scores) {
        var porcentagem = (scores[area] / totalPontos) * 100;
        resultado += `${areas[area]}: ${porcentagem.toFixed(2)}%\n`;
    }

    alert(resultado);
}

window.onload = function () {
    carregarJSON();
};
