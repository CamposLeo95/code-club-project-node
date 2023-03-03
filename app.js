const express = require('express')
const uuid = require('uuid')
const cors = require('cors')

const port = 5500
const app = express()

app.use(express.json())

//Cors é importante pois ele determina quais rotas poderam ter acesso ao nosso back-end.

//Caso não coloque nada ele libera pra geral!
app.use(cors())

const users = []

const link = "https://camposleo95.github.io/code-club-project-node/"

//Middleware é uma função que serve como um verificador entre as rotas ele erece os mesmos parametros de uma rota e pode exercer a mesma função das rotas

const checkUserId = (req, res, next) =>{
    const { id } = req.params

    const index = users.findIndex((user) => user.id === id)

    if(index < 0){
        return res.status(404).json({error: 'User not found'})
    } 

    // Criando um parametro de requisição para transferir os dados das seguintes variaveis nas rota em que usamos o middleware, lá pegamos os dados atravez deste req que criamos
    //const id = req.useId (EXEMPLO)
    req.useIndex = index
    req.useId = id

    next()
}

app.get(`${link}/users`, (req, res) =>{
    
    return res.json(users)     
})

app.post('/users', (req, res) => {

    const {name, age} = req.body
    const user = {id: uuid.v4(), name, age}

    users.push(user)

    return res.status(201).json(user)
})

app.put('/users/:id', checkUserId,  (req, res) =>{
    const { name, age } = req.body
    const index = req.useIndex
    const id = req.useId

    users[index] = {id: id, name, age}

    return res.status(204).json({message: 'Usuario alterado'})
})

app.delete('/users/:id', checkUserId, (req, res) =>{
    const index = req.useIndex

    users.splice(index, 1)

    //Colocar o .json() se não da erro
    return res.status(204).json()
})

app.listen(port, (err)=>{
    err ? console.log(err) 
        : console.log('Sevidor rodando');  
})

