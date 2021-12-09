const express = require("express")
const app = express()
const morgan = require("morgan")
const port = 5000

// import des routes animals
const animals = require("./routes/animals")

// ca nous permet d'acceder a req.body
app.use(express.json())

// middleware global qui affiche les infos
// des requetes
app.use(morgan('tiny'))

// middleware global
const log = (req, res, next) => {
  console.log("Vous avez reçu une requete")
  next()
}

// utilisation du middleware log, 
// il va etre appelé a chaque routes
app.use(log)

// utilisation des routes animals
app.use("/animals", animals)

app.listen(port, () => {
  console.log(`Server is running on port ${5000}`)
})