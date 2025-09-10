// API para consumir a Rick and Morty API

const express = require('express'); // Importa a biblioteca express
const cors = require("cors"); // Importa a biblioteca cors para permitir acesso externo
const axios = require('axios'); // Importa a biblioteca axios

const app = express(); // Instancia o servidor
const PORT = 3000; // Porta que irá rodar a aplicação

app.use(cors()); // Permite acesso externo a API
app.use(express.json()); // Permite receber dados JSON

// 1. Rota principal - Boas vindas
app.get('/', (req, res) => {
    res.json({
        message: 'Bem-vindo à minha API Rick and Morty!',
        endpoints: [
            'GET / - Esta mensagem de boas vindas',
            'GET /personagens - Lista todos os personagens',
            'GET /personagem/:id - Mostra um personagem específico pelo ID',
            'GET /multiplospersonagens - Lista múltiplos personagens por IDs'
        ]
    });
});

// 2. Rota /personagens - Lista todos os personagens
app.get('/personagens', async (req, res) => {
    const { page = 1 } = req.query; // Permite paginação
    
    try {
        const response = await axios.get(`https://rickandmortyapi.com/api/character?page=${page}`);
        const data = response.data;
        
        // Extrai informações essenciais dos personagens
        const personagens = data.results.map(character => ({
            id: character.id,
            nome: character.name,
            status: character.status,
            especie: character.species,
            genero: character.gender,
            origem: character.origin.name,
            localizacao: character.location.name,
            imagem: character.image
        }));
        
        res.json({
            info: data.info,
            personagens: personagens
        });
        
    } catch (err) {
        if (err.response?.status === 404) {
            return res.status(404).json({ error: 'Página não encontrada' });
        }
        res.status(500).json({ error: 'Erro ao obter dados dos personagens' });
    }
});

// 3. Rota /personagem/:id - Mostra personagem específico
app.get('/personagem/:id', async (req, res) => {
    const { id } = req.params;
    
    // Verifica se o ID é um número válido
    if (!id || isNaN(id)) {
        return res.status(400).json({ error: 'Informe um ID válido' });
    }
    
    try {
        const response = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
        const character = response.data;
        
        // Formata os dados do personagem
        const personagem = {
            id: character.id,
            nome: character.name,
            status: character.status,
            especie: character.species,
            tipo: character.type || 'N/A',
            genero: character.gender,
            origem: {
                nome: character.origin.name,
                url: character.origin.url
            },
            localizacao: {
                nome: character.location.name,
                url: character.location.url
            },
            imagem: character.image,
            episodios: character.episode,
            url: character.url,
            criado: character.created
        };
        
        res.json(personagem);
        
    } catch (err) {
        if (err.response?.status === 404) {
            return res.status(404).json({ error: 'Personagem não encontrado' });
        }
        res.status(500).json({ error: 'Erro ao obter dados do personagem' });
    }
});

// 4. Rota /multiplospersonagens - Lista múltiplos personagens por IDs
app.get('/multiplospersonagens', async (req, res) => {
    const { ids } = req.query;
    
    // Verifica se foram fornecidos IDs
    if (!ids) {
        return res.status(400).json({ error: 'Informe pelo menos um ID (ex: ?ids=1,2,3)' });
    }
    
    try {
        // Formata os IDs para o padrão da API Rick and Morty
        const idsArray = ids.split(',').map(id => id.trim());
        const idsString = idsArray.join(',');
        
        const response = await axios.get(`https://rickandmortyapi.com/api/character/${idsString}`);
        
        // Se for apenas um personagem, a API retorna um objeto, não um array
        const characters = Array.isArray(response.data) ? response.data : [response.data];
        
        // Formata os dados dos personagens
        const personagens = characters.map(character => ({
            id: character.id,
            nome: character.name,
            status: character.status,
            especie: character.species,
            genero: character.gender,
            origem: character.origin.name,
            localizacao: character.location.name,
            imagem: character.image
        }));
        
        res.json({
            total: personagens.length,
            personagens: personagens
        });
        
    } catch (err) {
        if (err.response?.status === 404) {
            return res.status(404).json({ error: 'Um ou mais personagens não foram encontrados' });
        }
        res.status(500).json({ error: 'Erro ao obter dados dos personagens' });
    }
});

// Rota adicional para buscar personagens por nome
app.get('/buscar', async (req, res) => {
    const { nome } = req.query;
    
    if (!nome) {
        return res.status(400).json({ error: 'Informe o nome do personagem para buscar' });
    }
    
    try {
        const response = await axios.get(`https://rickandmortyapi.com/api/character/?name=${nome}`);
        const data = response.data;
        
        const personagens = data.results.map(character => ({
            id: character.id,
            nome: character.name,
            status: character.status,
            especie: character.species,
            genero: character.gender,
            origem: character.origin.name,
            localizacao: character.location.name,
            imagem: character.image
        }));
        
        res.json({
            total: personagens.length,
            personagens: personagens
        });
        
    } catch (err) {
        if (err.response?.status === 404) {
            return res.status(404).json({ error: 'Nenhum personagem encontrado com esse nome' });
        }
        res.status(500).json({ error: 'Erro ao buscar personagens' });
    }
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}/`);
    console.log('\nEndpoints disponíveis:');
    console.log('GET / - Página inicial');
    console.log('GET /personagens - Lista personagens');
    console.log('GET /personagem/:id - Personagem por ID');
    console.log('GET /multiplospersonagens?ids=1,2,3 - Múltiplos personagens');
    console.log('GET /buscar?nome=rick - Buscar por nome');
});