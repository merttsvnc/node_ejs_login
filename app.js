require("dotenv").config()
const express = require('express');
const app = express();
const expressLayouts = require("express-ejs-layouts")
const connectDB = require("./config/db")

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// bodyParser
app.use(express.urlencoded({ extended: false }))

// Routers
app.use("/", require("./routes/index"))
app.use("/users", require("./routes/users"))

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`Server is listening on port ${port}...`))
  } catch (error) {
    console.log(error)
  }
}

start()