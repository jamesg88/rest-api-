const express = require("express");
const basicAuth = require('express-basic-auth');
const bcrypt = require('bcrypt');

const {User, Item} = require('./models');

// initialise Express
const app = express();

// specify out request bodies are json
app.use(express.json());

app.get('/', (req, res) => {
  res.send('<h1>Hello!!!!</h1>')
})

app.get('/users', async (req, res) => {
  //what should i put here?
  let users = await User.findAll()
  res.json({users});
})

app.get('/users/:id', async (req, res) => {
  let user = await User.findByPk(req.params.id);
  res.json({user});
})

// I want to get all items

app.get('/items', async(req, res)=> {
  let items = await Item.findAll();
  res.json({items});
})

// I want to get one item

app.get('/items/:id', async(req, res)=> {
  let item = await Item.findByPk(req.params.id);
  res.json({item});
})

// I want to delete one item

app.delete('/items/:id', async(req, res)=> {
  await Item.destroy({where: {id: req.params.id}});
  res.send('Deleted!')
})

// I want to create one item

app.post('/items', async(req, res)=> {
  let newItem = await Item.create(req.body);
  res.json({newItem})
})

// I want to update one item

app.put('/items/:id', async(req, res)=> {
  let updatedItem = await Item.update(req.body, {
    where : {id : req.params.id}
  });
  res.json({updatedItem})
})

app.listen(3000, () => {
  console.log("Server running on port 3000");
});