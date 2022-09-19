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
        const bookingCollections = client.db("travel").collection("booking")
        const hotelCollections = client.db("travel").collection("hotel")

        app.post("/blog", async (req, res) => {
            const newUser = req.body
            const result = await blogCollections.insertOne(newUser)
            res.send(result)
        })

        app.get("/blog", async (req, res) => {
            const query = {}
            const cursor = blogCollections.find(query)
            const result = await cursor.toArray()
            res.send(result)

        })



        app.delete("/blog/:id", async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const result = await blogCollections.deleteOne(query)
            res.send(result)
        })

        app.get("/blog/:id", async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const result = await blogCollections.findOne(query)
            res.send(result)
        })





        app.post("/name", async (req, res) => {
            const newUser = req.body
            const result = await nameCollections.insertOne(newUser)
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
        // --------------------------------------------

        app.post("/booking", async (req, res) => {
            const newUser = req.body
            const result = await bookingCollections.insertOne(newUser)
            res.send(result)
        })

        app.get("/booking", async (req, res) => {
            const query = {}
            const cursor = bookingCollections.find(query)
            const result = await cursor.toArray()
            res.send(result)

        })


        // -----------------------------------------------------
        app.get("/country", async (req, res) => {
            const query = {}
            const cursor = countryCollections.find(query)
            const result = await cursor.toArray()
            res.send(result)

        })

        // japan-----------------------------------------------

        // app.post("/country/:name", async (req, res) => {
        //     const newUser = req.body
        //     const result = await japanCollections.insertOne(newUser)
        //     res.send(result)
        // })


        app.get("/country/:name", async (req, res) => {
            const name = req.params.name
            const query = { name: name }
            const cursor = japanCollections.find(query)
            const result = await cursor.toArray()
            res.send(result)

        })

        app.get("/country/:name/:id", async (req, res) => {
            const name = req.params.name
            const id = req.params.id
            const query = { name: name, _id: ObjectId(id) }
            const cursor = japanCollections.find(query)
            const result = await cursor.toArray()
            res.send(result)
        })

        app.delete("/country/:name/:id", async (req, res) => {
            const id = req.params.id
            const name = req.params.name
            const query = { name: name, _id: ObjectId(id) }
            const result = await japanCollections.deleteOne(query)
            // const result = await cursor.toArray()
            res.send(result)
        })


        app.post("/country/:name", async (req, res) => {
            const newUser = req.body
            const result = await japanCollections.insertOne(newUser)
            res.send(result)
        })

        app.get("/country/:name/:firstPlaceName", async (req, res) => {
            const name = req.params.name
            const firstPlaceName = req.params.firstPlaceName
            const query = { name: name, firstPlaceName: firstPlaceName }
            const cursor = await japanCollections.find(query).toArray()
            res.send(cursor)
        })

        app.get("/country/:name/:id", async (req, res) => {
            const id = req.params.id
            const firstPlaceName = req.params.firstPlaceName
            const query = { _id: ObjectId(id), firstPlaceName: firstPlaceName }
            const cursor = await japanCollections.find(query).toArray()
            res.send(cursor)
        })

        // hotel--------------------------------------------------------------------


        app.post("/hotel", async (req, res) => {
            const newUser = req.body
            const result = await hotelCollections.insertOne(newUser)
            res.send(result)
        })

        app.get("/hotel", async (req, res) => {
            const query = {}
            const cursor = hotelCollections.find(query)
            const result = await cursor.toArray()
            res.send(result)

        })
        app.get("/hotel/:id", async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const cursor = hotelCollections.find(query)
            const result = await cursor.toArray()
            res.send(result)

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






// app.delete("/country/:id", async (req, res) => {
//     const id = req.params.id
//     const query = { _id: ObjectId(id) }
//     const result = await japanCollections.deleteOne(query)
//     res.send(result)
// })





// [
    // {
    //     "name": "japan",
    //     "firstimg": "https://img.freepik.com/premium-photo/cherry-blossoms-blooming-spring-spring-background-cherry-blossoms-nature-with-soft-focus_335224-1397.jpg?size=626&ext=jpg&ga=GA1.2.1198299981.1652771125",
    //     "firstPrice": "4500",
    //     "firstPlaceName": "Osaka",
    //     "firstdays": "3"
    // }


    // {
    //     "name": "japan",
    //     "firstimg": "https://img.freepik.com/free-photo/autumn-season-mountain-fuji-kawaguchiko-lake-japan_335224-96.jpg?size=626&ext=jpg&ga=GA1.2.1198299981.1652771125",
    //     "firstPrice": "3500",
    //     "firstPlaceName": "Tokyo",
    //     "firstdays": "5"
    // }

    // {
    //     "name": "japan",
    //     "firstimg": "https://img.freepik.com/free-photo/cherry-blossoms-fuji-mountain-spring-sunrise-shizuoka-japan_335224-110.jpg?size=626&ext=jpg&ga=GA1.2.1198299981.1652771125",
    //     "firstPrice": "9500",
    //     "firstPlaceName": "MountFuji",
    //     "firstdays": "10"
    // }
// ]









