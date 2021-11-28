const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const { query } = require('express');


// middle ware using 
const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;

// user : productDB password: cEGtL4uXO5FEcYGm

const uri = "mongodb+srv://productDB:D1SPxKFbSMDlONna@cluster0.5bitd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run (){
    try{
        await client.connect();
        // database name
        const database = client.db('product_shop');
        const productsCollection = database.collection('products');

        // APP METHOD
        app.post('/users',async(req,res) => {
            const newProduct = req.body;
            const result = await productsCollection.insertOne(newProduct);
            console.log(result);
            console.log(`A document was inserted with the _id: ${result.insertedId}`);
            res.json(result);

        });
        
        app.get('/users',async(req,res) => {
            const cursor = productsCollection.find({});
            const products = await cursor.toArray();
            res.json(products);
        })
    }
    finally{
        // await client.close();
    }
}

run().catch(console.dir);

app.get('/',(req,res) => {
    res.send('Node js Server is running');
})

app.listen(port,() => {
    console.log('Running on Port on the server',port);
})