document.getElementById('generate-btn').addEventListener('click', gerarSite);

function gerarSite() {
    fetch('/api/huggingface', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inputs: 'side para um mercado de médio porte' })
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Erro na requisição:', error));
}