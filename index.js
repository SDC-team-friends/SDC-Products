require('dotenv').config();
const express = require('express');
const pool = require('./databases/db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const productRoutes = require('./routes/products.js');
app.use('/products', productRoutes);

app.listen(PORT);
console.log(`Server listening at http://localhost:${PORT}`);