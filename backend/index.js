const express = require('express')
const mongoose = require('mongoose')
const userRoute = require('./routes/user.route');
const stopRoute = require('./routes/stop.route')
const touristRoute = require('./routes/tourist.route')
const cors = require('cors')
const path=require('path')


require('dotenv').config()

const app = express()
const port = process.env.port
app.use(express.json())
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB Atlas"))
.catch(err => console.error("MongoDB connection error:", err));

app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/api/users', userRoute);
app.use('/api/stops', stopRoute);
app.use('/api/tourists', touristRoute);


app.listen(port, () => console.log(`Server is running on port ${port}`))