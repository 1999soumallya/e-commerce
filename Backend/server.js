const dotenv = require('dotenv');
require('colors');
const { errorHandler } = require('./Middlewares/ErrorMiddlewares');
const express = require('express');
const products = require('./Data/Products');
const connectToMongo = require('./config/db');
const ProductsRoute = require('./Routers/ProductsRoute');
const UserRoute = require('./Routers/UserRoutes');

// .env config
dotenv.config();

// DetaBase Connected
connectToMongo()

// Rest Object 
const app = express()

// Use Body Purser
app.use(express.json())


// Routing 

app.get('/', (req, res) => {
    res.send('<h1>Welcome to node server</h1>');
});

app.use('/api/auth', ProductsRoute);
app.use('/api/auth', UserRoute);
app.use(errorHandler);

const PORT = 4000

app.listen(process.env.PORT || PORT, () => {
    console.log('====================================');
    console.log(`Server Running in ${process.env.NODE_ENV} Mode on Port ${process.env.PORT}`.inverse);
    console.log('====================================');
});