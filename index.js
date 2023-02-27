const express = require("express");
const mongoose = require("mongoose");
const app = express();
const route = require('./Router/route');
mongoose.set('strictQuery', true)
app.use(express.json());

mongoose.connect("mongodb+srv://plutonium-functionUp:Atlas@cluster0.suocjnk.mongodb.net/NimriteeDb", {useNewUrlParser : true})
.then(() => console.log("MongoDb is connected"))
.catch(err => console.log(err))

app.use('/', route);

const PORT = process.env.port || 3000;

app.listen(PORT , function(){
    console.log(`Express app running on ${PORT}`)
});

