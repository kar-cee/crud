const express = require('express');
const mongoose = require('mongoose');
const app = express();

const url = "mongodb+srv://karmat359:kartse3181@cluster0.ou7i9vu.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(url, { useNewUrlParser: true });
const con = mongoose.connection;
app.use(express.json());
try {
    con.on('open', () => {
        console.log('connected');
    })
} catch (error) {
    console.log("Error: " + error);
}

const studentrouter = require("./routes/students");
app.use('/students', studentrouter)

const port = 9000;
app.listen(port, () => {
    console.log('Server started');
})