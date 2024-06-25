
let resumo = 'https://back-end-cursos.vercel.app/resumo'

function leDadosResumo() {
    return fetch(resumo)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}

function carregaUMcurso() {
    leDadosResumo().then(resumo => {
        let imprime;
        let params = new URLSearchParams(location.search);
        let id = params.get('id');
        let card = resumo.find(elem => elem.id == id);
        
        if (card) {
            imprime = `
                <h2>${card.titulo}</h2>
            <img src="${card.img}" alt="" class="imgcurso">
            </div>
                <div>
                    <h3>Sobre o Curso:</h3>
                </div>
            <div>
                <p class="texto">${card.Rsobre}</p>
            </div>
            <div>
                <h3>O que você vai Estudar:</h3>
            </div>
            <div>
                <p>${card.Roq}</p>
            </div>
            <div>
                <h3>Áreas de atuação:</h3>
            </div>
            <div>
                <p>${card.Rareas}</p>
                <h4>${card.turno}</h4>
                <h4>${card.periodo}</h4>
            </div>
            <div>
                <h3>Locais:</h3>
                <p>${card.Rlocais}</p>
            </div>
            `
            
            
            document.getElementById('pagina').innerHTML = imprime;
            
        }
    });
}
window.onload = function () {
    carregaUMcurso()
}
