// Código API Simples 

// #01) Importa o Express
const express = require('express');

// #02) Cria uma instância do Express
const app = express();

// #03) Define a porta onde a API irá rodar
const port = 3001;

// #03.01 Adiciona uma lista para armazenar os dados de forma temporária
let dados = []; 

// #04) Middleware para permitir que o servidor lide com requisições no formato JSON
app.use(express.json());

// #05) Criação da rota GET na raiz (que responde com uma mensagem simples)
app.get('/', (req, res) => {
    res.send('Bem-vindo à minha API do Sistema Smart 4.0!');
});


// #05.02 Rota Post chamada data 
app.post('/cadastro', (req, res) => {
    const { nome, produto, quantidade } = req.body;
    
    // 1º: Validação dos dados
    if (!nome || !produto || !quantidade) {
        return res.status(400).json({
            error: 'Informe o nome, o produto e sua quantidade'
        });
    }

    // 2º: Processa e salva os dados
    const novo = { nome, produto, quantidade };
    dados.push(novo);
    
    // 3º: Envia resposta de sucesso
    res.status(201).json({
        message: 'Dados salvos com sucesso!', 
        data: novo
    });
});

// #05.03 Rota adicional para listar todos os dados salvos
app.get('/data', (req, res) => {
    res.json({
        message: 'Lista de dados salvos:',
        total: dados.length,
        dados: dados
    });
});

// #06) Inicia o servidor e define que ele deve rodar na porta 3000
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});