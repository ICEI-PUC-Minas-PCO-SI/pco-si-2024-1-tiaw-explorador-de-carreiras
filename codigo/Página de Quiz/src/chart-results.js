const url = 'https://back-end-quiz-khaki.vercel.app/resultado'
const jsonFilePath = url;

// Função para carregar o arquivo JSON
async function loadJSON() {
    try {
        const response = await fetch(jsonFilePath);
        const data = await response.json();
        return data;
    } catch (e) {
        console.error(`Erro ao carregar o arquivo JSON: ${e}`);
        return null;
    }
}

// Chama a função para carregar o JSON e criar o gráfico
loadJSON().then(jsonData => {
    if (!jsonData) return; // Retorna se o JSON não foi carregado
    console.log(jsonData);

    let chartData = jsonData[0];

    const labels = ['Ciências Humanas', 'Ciências Exatas', 'Ciências Sociais', 'Ciências Biológicas', 'Tecnologia']; // Define as categorias do gráfico
    const data = [chartData.humanas, chartData.exatas, chartData.sociais, chartData.bio, chartData.tech]; // Define os dados do gráfico

    const config = {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{ data: data }]
        },
    };

    let myChart = document.getElementById('results-chart').getContext('2d'); // Pega o elemento canvas para desenhar o gráfico

    let resultsChart = new Chart(myChart, config); // Desenha o gráfico

    // Função para gerar o PDF
    const generatePDF = () => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Título
        doc.setFontSize(20);
        doc.text('Resultados do Explorador de Carreira', 10, 10);

        // Subtítulo
        doc.setFontSize(16);
        doc.text('Análise Detalhada', 10, 20);

        // Texto introdutório
        doc.setFontSize(12);
        doc.text('A seguir estão os resultados detalhados de sua análise de carreira, incluindo a distribuição percentual das diferentes áreas.', 10, 30);

        // Dados do gráfico
        doc.setFontSize(12);
        doc.text('Ciências Humanas: ' + chartData.humanas + '%', 10, 40);
        doc.text('Ciências Exatas: ' + chartData.exatas + '%', 10, 50);
        doc.text('Ciências Sociais: ' + chartData.sociais + '%', 10, 60);
        doc.text('Ciências Biológicas: ' + chartData.bio + '%', 10, 70);
        doc.text('Tecnologia: ' + chartData.tech + '%', 10, 80);

        // Adiciona o gráfico ao PDF
        doc.addPage();
        doc.setFontSize(20);
        doc.text('Gráfico de Resultados', 10, 10);
        doc.addImage(resultsChart.toBase64Image(), 'PNG', 10, 20, 180, 160);

        // Adiciona uma nova seção com uma tabela
        doc.addPage();
        doc.setFontSize(20);
        doc.text('Informações Adicionais', 10, 10);

        // Tabela
        doc.setFontSize(12);
        doc.text('Área', 10, 30);
        doc.text('Descrição', 50, 30);

        const rows = [
            ['Ciências Humanas', 'Descrição sobre Ciências Humanas...'],
            ['Ciências Exatas', 'Descrição sobre Ciências Exatas...'],
            ['Ciências Sociais', 'Descrição sobre Ciências Sociais...'],
            ['Ciências Biológicas', 'Descrição sobre Ciências Biológicas...'],
            ['Tecnologia', 'Descrição sobre Tecnologia...']
        ];

        let y = 40;
        rows.forEach(row => {
            doc.text(row[0], 10, y);
            doc.text(row[1], 50, y);
            y += 10;
        });

        // Adiciona mais textos ou imagens conforme necessário
        // Exemplo: Adicionando uma nova página com mais texto
        doc.addPage();
        doc.setFontSize(20);
        doc.text('Conclusão', 10, 10);
        doc.setFontSize(12);
        doc.text('Esta é uma conclusão detalhada sobre os resultados do seu teste de cursos...', 10, 20);
        doc.text('As informações corretas serão entregues na última sprint pois depende dos artefatos dos outros integrantes', 10, 30);

        // Salva o PDF
        doc.save('resultado_detalhado.pdf');
    };

    // Evento de clique para o botão de download
    const downloadButton = document.getElementById('download-result');
    downloadButton.addEventListener('click', generatePDF);
});

// Essa parte é a que faz o gráfico aparecer quando clica no botão "mostrar resultados":
const toggleButton = document.getElementById('toggle-show-results');
const results = document.getElementById('chart-container');

toggleButton.addEventListener('click', function () {
    results.classList.toggle('is-hidden'); // Ao clicar no botão, remove a classe "is-hidden", mostrando o resultado
});
