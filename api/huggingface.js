import fetch from 'node-fetch';

/**
 * A requisição à API da huggingfaces não pode ser feita diretamente
 * via frontend em virtude de CORS.
 * A solução foi criar uma serverless function.
 */
export default async function handler(req, res) {
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
}
