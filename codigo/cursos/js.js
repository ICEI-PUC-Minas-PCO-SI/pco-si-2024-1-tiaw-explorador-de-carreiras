function search() {
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById('searchInput');
  filter = input.value.toUpperCase();
  ul = document.getElementById("lista");
  li = ul.getElementsByTagName('li');

  if (input.value === "") {
    ul.style.display = "none";
    return;
  } else {
    ul.style.display = "block";
  }
  for (i = 0; i < li.length; i++) {
    a = li[i];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].parentNode.parentNode.style.display = "";
    } else {
      li[i].parentNode.parentNode.style.display = "none";
    }
  }
  showSuggestions(input.value);
}

function showSuggestions(value) {
  var suggestions, input, filter, ul, li, i, txtValue, suggestionBox, suggestionItem;
  suggestions = ["Administração", "Ciências Contábeis", "Tecnologia em Gestão Comercial", "Tecnologia em Gestão de Produção Industrial", "Tecnologia em Gestão da Tecnologia da Informação", "Tecnologia em Gestão de Recursos Humanos", "Tecnologia em Gestão Financeira", "Tecnologia em Marketing", "Matemática", "Análise e Desenvolvimento de Sistemas", "Ciência da Computação", "Engenharia da Computação", "Engenharia de Controle e Automação", "Engenharia de Software", "Sistemas de Informação", "Tecnologia em Bancos de Dados", "Jogos Digitais", "Arquitetura e Urbanismo", "Engenharia Aeronáutica", "Engenharia Civil", "Engenharia Elétrica", "Engenharia Mecânica", "Engenharia Mecatrônica", "Engenharia Química", "Biomedicina", "Ciências Biológicas", "Enfermagem", "Farmácia", "Fisioterapia", "Fonoaudiologia", "Medicina Veterinária", "Medicina", "Nutrição", "Odontologia", "Ciências Econômicas", "Ciências Sociais", "Cinema e Audiovisual", "Direito", "Filosofia", "Geografia", "História", "Jornalismo", "Letras", "Pedagogia", "Psicologia", "Publicidade e Propaganda", "Relações Internacionais", "Relações Públicas", "Teologia"];
  input = document.getElementById('searchInput');
  filter = value.toUpperCase();
  ul = document.getElementById("suggestionBox");
  ul.innerHTML = '';

  for (i = 0; i < suggestions.length; i++) {
    txtValue = suggestions[i];
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      suggestionItem = document.createElement('li');
      suggestionItem.textContent = txtValue;
      suggestionItem.onclick = function() {
        input.value = this.textContent;
        ul.innerHTML = '';
        search(); 
      };
      ul.appendChild(suggestionItem);
    }
  }

  if (ul.innerHTML === '') {
    ul.style.display = 'none';
  } else {
    ul.style.display = 'block';
  }
}

document.addEventListener("DOMContentLoaded", function() {
  const lista = document.getElementById('lista');
  const suggestionBox = document.createElement('ul');
  suggestionBox.setAttribute('id', 'suggestionBox');
  suggestionBox.style.position = 'absolute';
  suggestionBox.style.zIndex = '1000';
  suggestionBox.style.backgroundColor = 'white';
  suggestionBox.style.border = '2px solid #ddd';
  suggestionBox.style.listStyleType = 'none';
  suggestionBox.style.padding = '0';
  suggestionBox.style.margin = '0';
  suggestionBox.style.width = '25%';
  suggestionBox.style.maxHeight = '200px';
  suggestionBox.style.overflowY = 'auto';
  suggestionBox.style.display = 'none';

  document.querySelector('.search-container').appendChild(suggestionBox);

  function carregarCursos() {
    fetch('db.json')
      .then(response => response.json())
      .then(data => {
        data.resumo.forEach(curso => {
          const a = document.createElement('a');
          a.setAttribute('href', `cursos.html?id=${curso.id}`);

          const divAju = document.createElement('div');
          divAju.classList.add('aju');

          const divCurso = document.createElement('div');
          divCurso.classList.add('curso');

          const img = document.createElement('img');
          img.setAttribute('src', curso.img);
          img.setAttribute('alt', '');

          const li = document.createElement('li');
          li.textContent = curso.titulo;
          divCurso.appendChild(img);
          divCurso.appendChild(li);

          divAju.appendChild(divCurso);

          a.appendChild(divAju);

          lista.appendChild(a);
        });
      })
      .catch(error => console.error('Erro ao carregar os dados dos cursos:', error));
  }

  carregarCursos();
});


