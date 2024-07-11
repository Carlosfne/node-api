const express = require('express');
const router = express.Router();
const Product = require('../models/Product/Product');

// CREATE
router.post('/products', async (req, res) => {
    try {
        const { nome, descricao, preco } = req.body;
        if (!nome || !descricao || !preco) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
        }

        const newProduct = await Product.create({ nome, descricao, preco });
        res.status(201).json(newProduct);
    } catch (error) {
      console.log(error)
        res.status(500).json({ error: 'Erro ao criar produto' });
    }
});

// READ
router.get('/products', async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar produtos' });
    }
});

// READ by ID
router.get('/products/:id', async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar produto' });
    }
});

// UPDATE
router.put('/products/:id', async (req, res) => {
    try {
        const { nome, descricao, preco } = req.body;
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }

        if (!nome || !descricao || !preco) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
        }

        product.nome = nome;
        product.descricao = descricao;
        product.preco = preco;
        await product.save();
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar produto' });
    }
});

// DELETE
router.delete('/products/:id', async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }

        await product.destroy();
        res.json({ message: 'Produto deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar produto' });
    }
});

module.exports = router;
