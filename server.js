import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from "axios";
import bodyParser from "body-parser";


/**
 * Propriedade intelectual cedida à Fernando S.
 *
 * Esse arquivo contém as configurações do servidor.
 * O código está comentado e os parâmetros podem ser alterados caso necessário.
 *
 * @author Bruno Carneiro
 */

// Carrega variáveis de ambiente do .env
dotenv.config();

// Cria a aplicação Express
const app = express();

// Recupera configurações do serviço de integração
const API_URL = process.env.API_URL;
const API_TOKEN = process.env.API_TOKEN;

// Porta configurada via .env ou padrão 3000
const PORT = process.env.PORT || 3000;

// Importa configuração da token
const API_URL = process.env.API_URL;
const API_TOKEN = process.env.API_TOKEN;

// Habilita o CORS para permitir requisições do frontend
app.use(cors());

// JSON por padrão
app.use(express.json());
app.use(bodyParser.json());

// Servir arquivos estáticos da pasta 'public'
app.use(express.static('public'));

// Rota de teste na API
app.post('/api/infer', async (req, res) => {
    const { question, context } = req.body;

    if (!question || !context) {
        return res.status(400).json({ error: 'Informe a pergunta e o contexto.' });
    }

    try {
        const response = await axios.post(
            API_URL,
            {
                inputs: "preciso de um site com um botão no centro da tela com o label 'clicar' e ao clicar ele adicionar um label abaixo 'clique efetuado'"
            },
            {
                headers: {
                    'Authorization': `Bearer ${API_TOKEN}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        console.log('resposta do modelo: ', response.data);
        res.json(response.data);

    } catch (error) {
        console.error('Erro ao chamar API da Hugging Face:', error.response?.data || error.message);
        res.status(500).json({ error: 'Erro ao processar a requisição.' });
    }
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
