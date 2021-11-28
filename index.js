const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// user : productDB password: cEGtL4uXO5FEcYGm

const uri = "mongodb+srv://productDB:D1SPxKFbSMDlONna@cluster0.5bitd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run (){
    try{
        await client.connect();
        console.log('database is connecting');
        // database name
        const database = client.db('product_shop');
        const productsCollection = database.collection('products');

    }
    finally{
        // await client.close();
    }
}

run().catch(console.dir);

console.log(uri);

app.get('/',(req,res) => {
    res.send('Node js Server is running');
})

app.listen(port,() => {
    console.log('Running on Port on the server',port);
})