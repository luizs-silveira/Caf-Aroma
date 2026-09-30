import express from 'express';

import dados from '../data/produtos.js';

const router = express.Router ();

function verificarItemExiste(req, res, next){

    const {id} = req.params;

    const index = dados.findIndex((produto) => produto.id ==id);

    if (index <0){
        return res.status(404).json({erro:"Produtos não encontrado!"});
    }

    req.id = id;
    req.index = index;

    return next ();

}

router.get('/', (req, res) => {
    res.json(dados)
});

router.post('/', (req, res) => {
    
    const {id, nome, descricao, preco, imagem} = req.body;

    if (!id || !nome || !descricao || !preco || !imagem){

        return res.status(400).json({erro:"Todos os campos são obrigatórios!"});
    }

    const existeItem = dados.some(item => item.id == id);

    if (existeItem){
        return res.status(400).json({erro:"Cadastro já existente!"})
    }

    const novoItem = {
        id: Number(id),
        nome,
        descricao,
        preco,
        imagem
    };

    dados.push(novoItem);

    res.status(201).json(dados)
});

router.put('/:id', verificarItemExiste, (req, res) => {
    
    const {nome, descricao, imagem} = req.body

    const index = req.index

    dados[index] = {
        ...dados[index],
        nome: nome !== undefined ? nome: dados [index].nome,
        descricao: descricao !== undefined ? descricao: dados [index].descricao,
        imagem: imagem !== undefined ? imagem: dados[index].imagem
    }

    res.status(200).json(dados[index])

});

router.delete('/:id', verificarItemExiste, (req, res) => {
    const index = req.index

    const id = req.id
    
    dados.splice(index, 1);

    res.json({mensagem: `Item com ID${id} deletado com sucesso!`});
});

export default router;
