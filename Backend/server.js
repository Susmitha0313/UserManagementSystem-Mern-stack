const express = require('express');
const dotenv = require('dotenv').config()
const cors = require("cors")
const port =  process.env.PORT || 5001
const userRoute = require('../Backend/routes/userRoutes')

const app = express();

app.use(express.json())
app.use(cors())

app.use('/', userRoute);

app.listen(port, () => console.log(`server running on http://localhost:${port}`))
