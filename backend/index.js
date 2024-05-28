const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const postRoute = require('./routers/postRoute');

const app = express();
const PORT = 8002;

app.use(cors({
    origin: '*'
}));

mongoose.connect("mongodb://localhost:27017/node_react_curd_25052024")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error('MongoDB connection error:', err))

app.use("/api", postRoute);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})