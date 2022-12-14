const express = require("express")
const dotenv = require("dotenv")
const { graphqlHTTP } = require('express-graphql')
const { connectDB } = require("./src/db")
const cookieParser = require("cookie-parser")
const { authenticate } = require("./src/middleware/auth")



const { userData } = require('./src/middleware/userData')


dotenv.config()

const app = express()

app.use(cookieParser())

app.use('/graphql', graphqlHTTP({
    schema: require('./src/graphql/schema'),
    graphiql: true
}))

app.set("view engine", "ejs")
app.set("views", "./src/templates/views")

app.use(express.urlencoded({ extended: true }))

app.use(authenticate)

app.use(userData)

require("./src/routes")(app)

app.get('/', (req, res) => {
    res.send('hello there!')
})

connectDB()



app.listen(process.env.PORT, () => {
    console.log(`Server is running at port ${process.env.PORT}`)
})


