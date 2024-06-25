let dbJSON = 'https://back-end-cursos.vercel.app/resumo'

function leDadosCards() {
    return fetch(dbJSON)
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

function exibeCursos(){
    leDadosCards().then(cursos => {
        let mostra = ''
        for(let i = 0; i < cursos.length; i++){
            let card = cursos[i];
            mostra += `
            <div class="tudo">
                 <ul id="lista">
                    <a href="cursos.html?id=${card.id}">
                        <div class="aju">
                            <div class="curso">
                            <img src="${card.img}" alt="">
                            <li>${card.titulo}</li>
                            <p>${card.area}</p>
                        </div>
                    </a>
                </ul>
            </div> 
            `

        }
        document.getElementById('todoscards').innerHTML = mostra
    });
}

window.onload = function (){
    exibeCursos()
}
