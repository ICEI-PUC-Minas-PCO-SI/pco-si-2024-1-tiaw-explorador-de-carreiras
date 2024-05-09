// script.js

var indicePerguntaAtual = 0;
var totalPerguntas = 0;
var questionsData = null;

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

    perguntaElemento.textContent = pergunta.questao;
    respostaElemento.innerHTML = '';

    pergunta.respostas.forEach((resposta) => {
        var chave = Object.keys(resposta)[0];
        var respostaButton = document.createElement('button');
        respostaButton.textContent = resposta[chave];
        respostaButton.value = chave;
        respostaButton.onclick = function () {
            selecionarResposta(chave);
        };
        respostaElemento.appendChild(respostaButton);
    });
}

function selecionarResposta(respostaSelecionada) {
    console.log('Resposta selecionada:', respostaSelecionada);

    proximaPergunta();
}

function proximaPergunta() {
    indicePerguntaAtual++;
    if (indicePerguntaAtual < totalPerguntas) {
        exibirPergunta(indicePerguntaAtual);
    } else {
        alert('Parabéns, você respondeu a todas as perguntas!');
    }
}

window.onload = carregarJSON;
