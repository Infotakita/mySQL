const express = require ("express")
const exphbs = require ("express-handlebars")
const mysql = require("mysql")

const app = express()

// definindo handlebars  como template
app.engine("handlebars",exphbs.engine())
app.set ("view engine", "handlebars")

// pasta de arquivos estaticos como CSS, imagem
app.use(express.static("public"))

// trabalhar com dados no formato json
app.use(express.urlencoded({
    extended:true
}))

app.use(express.json())

// rotas
app.post("/register/save",(request, response))

app.get("/register", (request, response) =>{
    response.render("register")
})
app.get("/", (request, response) => {
    response.render("home")
})

// conexão com mySQL
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "nodemysql",
    port: 3306
})

conn.connect((error) => {
    if (error){
        console.log(error)
        return
    }
    console.log("Conectado ao MySQL")

    app.listen(3000, () => {
        console.log("Servidor rodar porta 3000")
    } )
})
