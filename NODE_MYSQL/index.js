const { response } = require("express")
const express = require ("express")
const exphbs = require ("express-handlebars")
const { request } = require("http")
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

// CRUD >>CREATE, READ, UPDATE, DELETE

app.use(express.json())

// rotas
app.post("/register/save", (request, response) => {
    response.render("register");
});


app.get("/register", (request, response) =>{
    response.render("register")
})
app.get("/", (request, response) => {
    const sql = 'SELECT * FROM   books'

    conn.query(sql,(error, data) =>{
        if (error) {
            return console.log(error)
        }
        const books = data
        console.log(books)
        response.render("home",{books})
    })

    
})

app.get("/edit/:id",(request, response) =>{
    const id = request.params.id
    const sql = `
    SELECT * FROM books
    WHERE id = ${id}
    `
    conn.query(sql,(error,data)=> {
        if (error){
            return console.log(error)
        }

    })
} )
app.get("/book/:id",(request, reponse) =>{
    const id = request.paramis.id
    const sql = `
        SELECT * from BOOKS
        WHERE ID=${id}
    `
    
    conn.query(sql, (error,data) =>{
        if(error){
            return console.log(error)
        }
        const book = data[0]
        
        response.render("book", {book})
    })
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
