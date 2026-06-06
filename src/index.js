const express = require('express')
const app = express();
const dotenv = require('dotenv')
const userRoutes = require('./route/userroute')
const productRoutes=require('./route/producrRoute')
const cartRoutes=require('./route/cartRoute')
const oderRoute=require('./route/orderRoute')
const Connectdb = require('./config/db');
app.use(express.json());
dotenv.config();
Connectdb();
const port = process.env.PORT;
app.use('/api',userRoutes)
app.use('/api',productRoutes);
app.use('/api',cartRoutes)
app.use('/api',oderRoute)
app.listen(port, () => {
    console.log(`Server is running in the port ${port}`)
})