import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from "axios";
import bodyParser from "body-parser";
import fetch from "node-fetch";


/**
 * Propriedade intelectual cedida à Fernando S.
 *
 * Esse arquivo contém as configurações do servidor.
 * O código está comentado e os parâmetros podem ser alterados caso necessário.
 *
 * ATENÇÃO: Esse arquivo trata das configurações para execução local.
 * No ambiente de produção, esse servidor node não existirá.
 * Ele é configurado para o desenvolvimento local da aplicação
 *
 * @author Bruno Carneiro
 */

/**
 * --------------------
 * Configurações gerais
 * --------------------
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

// Habilita o CORS para permitir requisições do frontend
app.use(cors());

// JSON por padrão
app.use(express.json());
app.use(bodyParser.json());

// Servir arquivos estáticos da pasta 'public'
app.use(express.static('public'));

/**
 * -----
 * Rotas
 * -----
 */
app.post('/api/huggingface', async (req, res) => {
    const response = await fetch(process.env.API_URL, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.API_TOKEN}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(req.body)
    });

    const data = await response.json();
    res.status(200).json(data);
});

/**
 * -----
 * Start
 * -----
 */
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
