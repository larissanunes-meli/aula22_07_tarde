const express = require('express');

let produtos = require("./produtos")

const app = express();

app.use(express.json())

app.get('/produtos', (req,res)=>{
    res.status(200).json(produtos)
})

app.post('/produtos' , (req, res)=>{
    const content = req.body
    produtos = [...produtos, content]
    res.status(201).json(produtos)
})

app.get('/produtos/:id/:details?', (req, res)=>{
    const id = Number(req.params.id)

    const details = req.params.details || "sem descrição"

    const product = produtos.find((produto)=> produto.id === id)
    res.status(200).json(product)
})

app.put('/produtos/:id', (req, res)=>{
    const id = Number(req.params.id)

    const content = req.body

    const product = produtos.find((produto)=> produto.id === id)
    if(!product){
        res.status(400).json({"mensage": "produto noa encontrado"})
    }


   const produtoAtualizado =  produtos.map((produto)=>{
        if(produto.id === id){
            return content
        }
        return produto
    })
    produtos = produtoAtualizado
    res.status(200).json(produtos)
})

app.delete('/produtos/:id', (req, res)=>{
    const id = Number(req.params.id)

    const product = produtos.find((produto)=> produto.id === id)
    if(!product){
        res.status(400).json({"mensage": "Produto nao foi encontrado"})
    }

    produtos = produtos.filter((produto)=>{
        return produto.id !== id
    })
    res.status(200).json(produtos)
})
