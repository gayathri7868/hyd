const express = require('express')
const mongoose = require('mongoose')
const userRoute = require('./routes/user.route');
const stopRoute = require('./routes/stop.route')
const cors = require('cors')

require('dotenv').config()

const app = express()
const port = process.env.port
app.use(express.json())
app.use(cors());

mongoose.connect('mongodb://localhost:27017/hyd')
    .then((response) => console.log("connected to database"))


app.use('/api/users', userRoute);
app.use('/api/stops', stopRoute);


app.listen(port, () => console.log(`Server is running on port ${port}`))