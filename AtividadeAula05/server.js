// API com utilização da OpenWeather


const express = require('express'); // Importa a biblioteca express
const cors = require("cors"); // Importa a biblioteca cors para permitir acesso externo
const axios = require('axios'); // Importa  a biblioteca axios
//require('dotenv').config(); // Pega as variáveis do sistema
const app = express();  // Instancia o servidor
const PORT = 3000; // Porta que irá rodar a aplicação
const apiKey = '46feaf2d6f46008600418771836b4450'
//process.env.OPENWEATHER_API_KEY; // Pega a variável da chave da API no .env


app.use(cors()); // Permite acesso externo a API


app.get('/weather',async(req,res)=>{
    const{city,country } = req.query;  // Armazena a cidade e o país quando há alguma requisição
    if(!city || !country){
        return res.status(400).json({error:'Informe a cidade e o pais'});
    }
    try {
        // Requisição para pegar as condições climáticas de uma cidade
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${apiKey}&units=metric&lang=pt_br`);
        // Variável para armazenar a resposta da API
        const data = response.data;
        const temperature = data.main?.temp ??0;
        const humidity = data.main?.humidity ??0;
        const windSpeed = data.wind?.speed? data.wind.speed *3.6 :0;
        const rainChance = data.rain?.['24h'] ?? 0;
        const weatherCondition = data.weather?.[0]?.description ?? 'Desconhecido';


        res.json({temperature,humidity,windSpeed,rainChance,weatherCondition});
   
    }catch(err){
        if(err.response?.status==404){
            return res.status(404).json({error:'Cidade não encontrada'});
        }
        res.status(500).json({error:'Erro ao obter dados do clima'});
    }


});

// Cria uma rota múltipla para exibir mais de uma cidade
app.get('/multiple',async(req,res) => {
    const {cities}= req.query;
    // Verifica se há alguma idade
    if(!cities){
     return res.status(400).json({error:'Informe pelo menos uma cidade'})
    }
    const cityList = cities.split(',');
    const results =[]; // Lista para armazenar os resultados
    try {
        for (let city of cityList){
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`);
        
        // Results.push o push serve para adicionar elementos na lista
        results.push({city,temperature: response.data.main?.temp ??0,
            weather: response.data.weather?.[0]?.description??'Desconhecido'});
        
    }
res.json(results);
    
}  catch(err){
        res.status(500).json({error:'Erro ao consultar API para múltiplas cidades'});
     
    }

});


/*app.get('/multiple', async (req, res) => {
    const { cities } = req.query;

    if (!cities) {
        return res.status(400).json({ error: 'Informe pelo menos cidade.'});
    }

    const cityList = cities.split(',');
    const results = [];

    try {
        for (let city of cityList) {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`
            );

        results.push({
            city,
            temperature: response.data.main?.temp ?? 0,
            weather: response.data.weather?.[0]?.description ?? 'Desconhecido'
        });
        }

        res.json(results);
        
    }   catch (err) {
        res.status(500).json({ error: 'Erro ao consultar API para múltiplas cidades.'})
    }    
});
*/

app.get('/alert', async (req, res) => {
    const { city, country } = req.query;

    if (!city || !country) {
        return res.status(400).json({ error: 'Informe cidade e país.'});
    }

    try {
        const response = await axios.get (`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=metric&lang=pt_br`);

        const temp = response.data.main?.temp ?? 0;

        let alert = temp > 30 ? 'Quente' : temp < 10 ? 'Frio' : 'Agradável';

        res.json({ city, temperature: temp, alert});

    }   catch (err) {
        res.status(500).json({ error: 'Erro ao obter dados do clima.'})
    } 
});
app.listen(PORT,()=>console.log(`Servidor rodando em http://localhost:${PORT}/`));