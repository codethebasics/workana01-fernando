document.getElementById('generate-btn').addEventListener('click', gerarSite);

function sendPrompt(evt) {
    evt.preventDefault();

    // Obtendo o valor do input
    const prompt = document.getElementById('cep').value;
    axios.post('/api/mensagem', { prompt: prompt })
        .then(response => {
            document.getElementById('resposta').innerText = JSON.stringify(response.data.mensagem);
        })
        .catch(error => {
            console.error('Erro ao chamar API:', error);
            document.getElementById('resposta').innerText = 'Erro ao chamar API.';
        });
}

function gerarSite() {
    fetch('http://localhost:3000/api/infer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({"question":"Quem é o presidente dos Estados Unidos?","context":"Joe Biden é o 46º presidente dos Estados Unidos."})
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Erro na requisição:', error));
}