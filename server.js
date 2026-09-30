import express from 'express'
import cors from 'cors'
import path from 'path'
import {fileURLToPath} from 'url'

import produtosRouter from './rotas/produtos.js';

import cardapioRouter from './rotas/cardapio.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;



// Libera as requisições de outras origens
app.use(cors());
app.use(express.json());


app.use (express.static(path.join(__dirname, 'Public')));
app.use ('/Img', express.static(path.join(__dirname, 'Img')));

app.use('/api/cardapio', cardapioRouter);

app.use('/api/produtos', produtosRouter);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);    
})
