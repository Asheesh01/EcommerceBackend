const express=require('express')
const app=express();
const dotenv=require('dotenv')
const userRoutes=require('./route/userroute')
const Connectdb=require('./config/db');
app.use(express.json());
dotenv.config();
Connectdb();
const port=process.env.PORT;
app.use('/api',userRoutes);
app.listen(port,()=>{
    console.log(`Server is running in the port ${port}`)
})