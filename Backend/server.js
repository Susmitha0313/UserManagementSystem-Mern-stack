const express = require('express');
const dotenv = require('dotenv').config()
const cors = require("cors")
const port =  process.env.PORT || 5001
const userRoute = require('../Backend/routes/userRoutes')
const adminRouter = require('../Backend/routes/adminRouter')
const connectDB = require('./database/database')
const path = require("path")

const app = express();
connectDB()

app.use(express.json())
app.use(cors());
app.use('/images',express.static(path.join(__dirname,'/public/userImages')));


app.use('/', userRoute);
app.use('/admin' , adminRouter)

app.listen(port, () => console.log(`server running on http://localhost:${port}`))
  