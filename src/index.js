const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const route = require("./Router/route");

const app = express();
mongoose.set("strictQuery", true);

app.use(express.json());
app.use(cors());

dotenv.config();

mongoose
  .connect(process.env.MONGO_DB, { useNewUrlParser: true })
  .then(() =>
    app.listen(process.env.port, () => {
      console.log(
        `\nExpress app running on ${process.env.port}\nMongo DB is connected`
      );
    })
  )
  .catch((err) => console.log(err));

app.use("/", route);
