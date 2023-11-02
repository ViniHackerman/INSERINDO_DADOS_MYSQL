const express = require("express")
const exphbs = require("express-handlebars")
const mysql = require("mysql2")

const app = express()

// definindo o Handlebars como template engine
app.engine("handlebars", exphbs.engine())
app.set("view engine", "handlebars")

// Pasta de Arquivos estaticos como CSS, imagens
app.use(express.static("public"))

// Trabalhar com dados no formato Json
app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())


//Rotas
app.post("/register/save", (request, response) => {
    const { title, pageqty } = request.body

    const book = 
    {
        title: title,
        pageqty: pageqty
    }

    const query = `
        INSERT INTO books (title, pageqty)
        VALUES ('${book.title}', '${book.pageqty}')
    `

    conn.query(query, (error) => {
        if (error) {
            console.log(error)
            return
        }

        response.redirect("/")
    })
})

app.get("/register", (request, response) => {
    response.render("register")
})

app.get("/", (resquest, response) => {
    response.render("home")
})


//Conexão com MySQL
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "nodemysql",
    port: 3306
})

conn.connect((error) => {
    if (error) {
        console.log(error)
        return
    }

    console.log("Conectado ao MySQL!")

    app.listen(3000, () => {
        console.log("Servidor rodando na Porta 3000!")
    })
})