const express = require('express');
const cors = require('cors')

// Database Connection Import
const {connection} = require('./Configuration/db.js')

// Importing Routes
const {AuthRoutes} = require('./Routes/AuthRouter.js')
const {UserRoutes} = require('./Routes/UserRouter.js')
const {BlogRouter} = require('./Routes/BlogsRouter.js')

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());


// Routes
app.use('/auth',AuthRoutes);
app.use('/user',UserRoutes)
app.use('/blog',BlogRouter)


// Server Connection with database
app.listen(8000,async()=>{
    try {
        await connection;
        console.log('Connection to database established on port 8000');
    } catch (error) {
        console.log(error);
    }
})