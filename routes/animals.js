const express = require("express")
const app = express()

let animals = require("../animals.json")

// définition du middleware checkAnimal
// qui va verifier si l'animal existe
// - si l'animal existe, je passe a la suite, j'execute ma route
// - si l'animal n'existe pas, je renvoie une 404 not found
const checkAnimal = (req, res, next) => {
  const { id } = req.params
  const animal = animals.find(animal => animal.id === Number(id))

  if (!animal) {
    res.status(404).send("Not found")
  } else {
    next()
  }
}

app.get("/", (req, res) => {
  res.json(animals)
})

app.post("/", (req, res) => {
  const animal = {
    id: animals[animals.length - 1].id + 1,
    ...req.body
  }

  animals = [ ...animals, animal ]
  
  res.json(animal)
})

// le middleware checkAnimal va etre executé
// avant ma fonction callback
app.get("/:id", checkAnimal, (req, res) => {
  const { id } = req.params
  const animal = animals.find(animal => animal.id === Number(id))
  
  res.json(animal)
})

// le middleware checkAnimal va etre executé
// avant ma fonction callback
app.delete("/:id", checkAnimal, (req, res) => {
  const { id } = req.params
  const index = animals.findIndex(animal => animal.id === Number(id))
  
  animals.splice(index, 1)
  res.status(204).send("Success")
})

module.exports = app