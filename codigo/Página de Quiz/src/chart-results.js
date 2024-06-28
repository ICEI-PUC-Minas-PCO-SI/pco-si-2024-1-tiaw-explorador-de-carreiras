const url = 'https://back-end-quiz-khaki.vercel.app/resultado'
const jsonFilePath = url;

// Função para carregar o arquivo JSON
async function loadJSON() {
    try {
        const response = await fetch(jsonFilePath);
        const data = await response.json();
        return data;
    } catch (e) {
        console.error('Erro ao carregar o arquivo JSON: ${e}');
        return null;
    }
}

// Chama a função para carregar o JSON e criar o gráfico
loadJSON().then(jsonData => {
    if (!jsonData) return; // Retorna se o JSON não foi carregado
    console.log(jsonData);

    let chartData = jsonData[0];

    const labels = ['Humanidade e Comunicação', 'Ciências Exatas', 'Administração e Gestão', 'Saúde e Biologia', 'Tecnologia da Informação']; // Define as categorias do gráfico
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
    
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const margin = 10;
        const maxWidth = pageWidth - 2 * margin; // Largura máxima para o texto com margem
    
        // Dimensões do gráfico
        const chartWidth = 120; // Largura do gráfico
        const chartHeight = (chartWidth / 4) * 3; // Altura para manter a proporção 4:3
    
        // Função para centralizar texto
        const centerText = (text, y) => {
            const textWidth = doc.getStringUnitWidth(text) * doc.getFontSize() / doc.internal.scaleFactor;
            const x = (pageWidth - textWidth) / 2;
            doc.text(text, x, y);
        };
    
        // Título
        doc.setFontSize(20);
        doc.text('Resultados do Explorador de Carreira', margin, 10);
    
        // Subtítulo
        doc.setFontSize(16);
        centerText('Análise Detalhada', 20);
    
        // Texto introdutório
        doc.setFontSize(12);
        centerText('A seguir estão os resultados detalhados de sua análise de carreira', 30);
    
        // Dados do gráfico
        doc.setFontSize(12);
        doc.text('Humanidade e Comunicação: ' + chartData.humanas + '%', margin, 40);
        doc.text('Ciências Exatas: ' + chartData.exatas + '%', margin, 50);
        doc.text('Administração e Gestão: ' + chartData.sociais + '%', margin, 60);
        doc.text('Saúde e Biologia: ' + chartData.bio + '%', margin, 70);
        doc.text('Tecnologia da Informação: ' + chartData.tech + '%', margin, 80);
    
        // Adiciona o gráfico ao PDF logo após os dados do gráfico
        doc.setFontSize(20);
        doc.text('Dados do Gráfico', margin, 100);
        const chartX = (pageWidth - chartWidth) / 2; // Centraliza o gráfico horizontalmente
        doc.addImage(resultsChart.toBase64Image(), 'PNG', chartX, 120, chartWidth, chartHeight);
    
        // Adiciona uma nova seção com uma tabela
        doc.addPage();
        doc.setFontSize(20);
        doc.text('Informações Adicionais', margin, 10);
    
        // Tabela
        doc.setFontSize(12);
        doc.text('Área', 10, 30);
        doc.text('Descrição', 50, 30);
    
        const rows = [
            ['Humanidade e Comunicação:', 'Envolve o estudo das condições e realizações humanas, englobando áreas como história, filosofia, línguas, literatura, artes e outras disciplinas que exploram aspectos culturais e sociais.'],
            ['Ciências Exatas:', 'Engloba o estudo de disciplinas que envolvem rigor e precisão, como matemática, física, química e áreas afins, focando em fórmulas, teorias e experimentos que explicam fenômenos naturais.'],
            ['Administração e Gestão:', 'Os cursos de Administração e Gestão são projetados para preparar os estudantes para uma variedade de funções gerenciais e administrativas em diversos setores. A seguir, detalho o que normalmente é coberto nesses cursos, suas possíveis áreas de especialização, e os benefícios de seguir uma carreira nessas áreas.'],
            ['Saúde e Biologia:', 'Os cursos de Saúde e Biologia abrangem uma vasta gama de disciplinas que exploram os aspectos biológicos, fisiológicos, clínicos e sociais da vida e da saúde humana e animal. A seguir, apresento uma visão geral dos cursos em cada uma dessas áreas, destacando seus objetivos, conteúdos típicos e possíveis carreiras.'],
            ['Tecnologia da Informação:', 'Trata do desenvolvimento e aplicação de técnicas, ferramentas e sistemas para resolver problemas e melhorar a qualidade de vida, englobando áreas como informática, engenharia, eletrônica, robótica e outras inovações tecnológicas.']
        ];
    
        let y = 40;
        rows.forEach(row => {
            const areaName = row[0];
            const description = row[1];
            const areaNameLines = doc.splitTextToSize(areaName, 40); // Ajuste para quebra de linha no nome da área
            const descriptionLines = doc.splitTextToSize(description, maxWidth - 60); // Ajuste da largura para a descrição
    
            areaNameLines.forEach((line, index) => {
                doc.text(line, 10, y + (index * 10));
            });
    
            descriptionLines.forEach((line, index) => {
                doc.text(line, 50, y + (index * 10));
            });
    
            y += Math.max(areaNameLines.length, descriptionLines.length) * 10 + 10; // Ajusta o valor de y para a próxima linha
        });
    
        // Adiciona mais textos ou imagens conforme necessário
        // Exemplo: Adicionando uma nova página com mais texto
        doc.addPage();
        doc.setFontSize(20);
        doc.text('Conclusão', margin, 10);
        doc.setFontSize(12);
    
        const conclusionText = 'As diversas áreas do conhecimento oferecem uma ampla gama de oportunidades profissionais de trabalho. ' +
            'Nas Ciências Humanas, cursos como História, Filosofia e Letras é voltado para atuarem na educação, pesquisa e preservação cultural. ' +
            'Nas Ciências Exatas, Matemática, Física e Química da ênfase para o ensino, pesquisa, setores industriais, inovação e desenvolvimento tecnológico. ' +
            'Administração e Gestão, com cursos como Administração, Gestão de Recursos Humanos e Gestão Pública, preparam profissionais para atuar em planejamento estratégico, liderança organizacional e políticas públicas, com foco na eficiência organizacional e desenvolvimento socioeconômico.' +
            'Nas saúde e biologia, Biologia, Biomedicina e Medicina são cursos que direcionam para a pesquisa científica, saúde pública e medicina clínica, setores com alta demanda e relevância contínua. ' +
            'Por fim, na área de Tecnologia, com cursos como Engenharia da Computação, Ciência da Computação e Sistemas de Informação, tem um foco maior para um mercado em constante expansão, com oportunidades em desenvolvimento de software, segurança da informação e inteligência artificial.';
    
        const conclusionLines = doc.splitTextToSize(conclusionText, maxWidth);
        conclusionLines.forEach((line, index) => {
            doc.text(line, margin, 20 + (index * 10));
        });
    
        const additionalText = 'Ao retornar para a tela de resultados, existe a página de cursos';
        const additionalLines = doc.splitTextToSize(additionalText, maxWidth);
        additionalLines.forEach((line, index) => {
            doc.text(line, margin, 30 + (conclusionLines.length * 10) + (index * 10));
        });
    
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

// Evento de clique para redirecionar para a página de cursos