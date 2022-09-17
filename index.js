const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
require('dotenv').config()
const port = process.env.PORT || 5000
const app = express()

// middleware
app.use(cors())
app.use(express.json())



// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.m0wfi.mongodb.net/?retryWrites=truew=majority`

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ps3bes6.mongodb.net/?retryWrites=true&w=majority`


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })



async function run() {

    try {
        await client.connect()

        const blogCollections = client.db("travel").collection("blog")
        const nameCollections = client.db("travel").collection("name")
        const countryCollections = client.db("travel").collection("country")
        const japanCollections = client.db("travel").collection("japan")

        app.post("/blog", async (req, res) => {
            const newUser = req.body
            const result = await blogCollections.insertOne(newUser)
            res.send(result)
        })

        app.post("/name", async (req, res) => {
            const newUser = req.body
            const result = await nameCollections.insertOne(newUser)
            res.send(result)
        })


        app.get("/blog", async (req, res) => {
            const query = {}
            const cursor = blogCollections.find(query)
            const result = await cursor.toArray()
            res.send(result)

        })

        app.get("/name", async (req, res) => {
            const query = {}
            const cursor = nameCollections.find(query)
            const result = await cursor.toArray()
            res.send(result)

        })


        // My items
        app.get('/name/:name', async (req, res) => {
            const name = req.params.name
            const query = { name: name }
            const cursor = await nameCollections.find(query).toArray()
            res.send(cursor)
        })
        // -------------------------------------------------------- country

        app.post("/country", async (req, res) => {
            const newUser = req.body
            const result = await countryCollections.insertOne(newUser)
            res.send(result)
        })


        app.get("/country", async (req, res) => {
            const query = {}
            const cursor = countryCollections.find(query)
            const result = await cursor.toArray()
            res.send(result)

        })

        // japan-----------------------------------------------

        app.post("/country/japan", async (req, res) => {
            const newUser = req.body
            const result = await japanCollections.insertOne(newUser)
            res.send(result)
        })


        app.get("/country/:name", async (req, res) => {
            const query = {}
            const cursor = japanCollections.find(query)
            const result = await cursor.toArray()
            res.send(result)

        })

        app.delete("/country/:id", async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const result = await japanCollections.deleteOne(query)
            res.send(result)
        })

        app.get("/country/:name/:id", async (req, res) => {
            const id = req.params.id
            const name = req.params.name
            // console.log(id, name)
            const query = { _id: ObjectId(id) }
            const cursor = await japanCollections.find(query).toArray()
            res.send(cursor)
        })



    }
    finally {

    }
}
run().catch(console.dir)



app.get("/", (req, res) => {
    res.send("Running Genius Server")
})

app.listen(port, () => {
    console.log("Listening to port", port)
})




















