const express = require("express")
const mongoose = require("mongoose")
const exphbs = require("express-handlebars")
const todoRoutes = require("./routes/todos")
const path = require("path")

const app = express()

const PORT = process.env.PORT || 3000

const hbs = exphbs.create({
    defaultLayout: "main",
    extname: "hbs"
})

app.engine("hbs", hbs.engine)
app.set("view engine", "hbs")
app.set("views", "views")

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))

app.use(todoRoutes)


async function start() {
    try {
        await mongoose.connect("mongodb+srv://georgetsendra:1234@cluster0-ptoog.mongodb.net/todos", {
            useMongoClient: true,
            useFindAndModify: false
        })

        app.listen(PORT, ()=>{
            console.log(`Server has been started ${PORT}`);
        })
        
    } catch (error) {
        console.log(error);
        
    }
}

start()
