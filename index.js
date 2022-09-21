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
        const bookingHotelCollections = client.db("travel").collection("bookingHotel")
        const shopCollections = client.db("travel").collection("shop")
        const orderCollections = client.db("travel").collection("order")
        const countryFlightbookingCollections = client.db("travel").collection("countryFlightbooking")
        const updateUserCollection = client.db("travel").collection("updateuser")

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
        // shop------------------------------------------------------------------------------------------

        app.post("/shop", async (req, res) => {
            const newUser = req.body
            const result = await shopCollections.insertOne(newUser)
            res.send(result)
        })

        app.get("/shop", async (req, res) => {
            const query = {}
            const cursor = shopCollections.find(query)
            const result = await cursor.toArray()
            res.send(result)
        })

        app.get("/shop/:id", async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const cursor = shopCollections.find(query)
            const result = await cursor.toArray()
            res.send(result)

        })

        app.delete("/shop/:id", async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const result = await shopCollections.deleteOne(query)
            res.send(result)
        })
        // --------------------------------------------------------------------------------------------

        app.post("/order", async (req, res) => {
            const newOrder = req.body
            const result = await orderCollections.insertOne(newOrder)
            res.send(result)
        })


        app.get("/order", async (req, res) => {
            const query = {}
            const cursor = orderCollections.find(query)
            const result = await cursor.toArray()
            res.send(result)
        })

        app.delete("/order/:id", async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const result = await orderCollections.deleteOne(query)
            res.send(result)
        })


        app.get("/myorder", async (req, res) => {
            const email = req.query.email
            const query = { email: email }
            const result = await orderCollections.find(query).toArray()
            return res.send(result)
        })

        // booking hotel----------------------------------------------------------------------------------------------------

        app.post("/bookingHotel", async (req, res) => {
            const newOrder = req.body
            const result = await bookingHotelCollections.insertOne(newOrder)
            res.send(result)
        })


        app.get("/mybookiinghotel", async (req, res) => {
            const email = req.query.email
            const query = { email: email }
            const result = await bookingHotelCollections.find(query).toArray()
            return res.send(result)
        })



        // get all boking
        app.get("/bookingHotel", async (req, res) => {
            const query = {}
            const cursor = bookingHotelCollections.find(query)
            const result = await cursor.toArray()
            res.send(result)
        })

        app.delete("/bookingHotel/:id", async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const result = await bookingHotelCollections.deleteOne(query)
            res.send(result)
        })

        // country booking-----------------------------------------------------------------------------------------------------------------

        // for all
        app.post("/countryFlightbooking", async (req, res) => {
            const newOrder = req.body
            const result = await countryFlightbookingCollections.insertOne(newOrder)
            res.send(result)
        })

        // for all
        app.get("/countryFlightbooking", async (req, res) => {
            const query = {}
            const cursor = countryFlightbookingCollections.find(query)
            const result = await cursor.toArray()
            res.send(result)
        })

        app.get("/myordercountryFlightbooking", async (req, res) => {
            const email = req.query.email
            const query = { email: email }
            const result = await countryFlightbookingCollections.find(query).toArray()
            return res.send(result)
        })

        app.delete("/countryFlightbooking/:id", async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const result = await countryFlightbookingCollections.deleteOne(query)
            res.send(result)
        })


        // ------------------------------------------------------------------------------------------------------------------

        // all user and xoss
        app.put("/updateuser/:email", async (req, res) => {
            const email = req.params.email
            const user = req.body
            const filter = { email: email }
            const options = { upsert: true }
            const updateDoc = {
                $set: user
            }
            const result = await updateUserCollection.updateOne(filter, updateDoc, options)
            res.send(result)

        })

        // My items
        app.get('/updateuser/:email', async (req, res) => {
            const email = req.params.email
            const query = { email: email }
            const cursor = await updateUserCollection.find(query).toArray()
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




