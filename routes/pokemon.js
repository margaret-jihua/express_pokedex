var express = require('express');
var router = express.Router();
var db = require('../models')
const axios = require('axios'); 
let pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/';
  
// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll().then(function(poke) {    
    res.render('pokemon', {myPoke: poke});    
  })
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  db.pokemon.create({
    name: req.body.name
  }).then(function(poke) {
    console.log('Created: ', poke.name);
  })
  res.redirect('pokemon');
});

// GET /pokemon/:id - rander a show page with infomation about the pokemon by its row id
router.get('/:id', function (req, res) {
  let pokeId = req.params.id;
  db.pokemon.findOne({
    where: {id: pokeId}
  }).then(function(poke) {
    // Get API data of this pokemon
    let url = pokemonUrl+poke.name.toLowerCase()
    axios.get(url).then(response => {
      let pokemon = response.data;
      res.render('show', {myPoke: pokemon});
    })
  })
})

module.exports = router;
