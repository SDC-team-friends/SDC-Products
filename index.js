require('dotenv').config();
const express = require('express');
const pool = require('./databases/db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const productRoutes = require('./routes/products.js');
app.use('/products', productRoutes);
app.get(`/${process.env.LOADER_IO_TOKEN}`, (req, res) => { res.send(process.env.LOADER_IO_TOKEN)});

app.listen(PORT);
console.log(`server listening on PORT: ${PORT}`);