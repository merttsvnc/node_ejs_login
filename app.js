require("dotenv").config()
const express = require('express');
const app = express();
const expressLayouts = require("express-ejs-layouts")
const connectDB = require("./config/db")
const flash = require("connect-flash")
const session = require("express-session");
const passport = require("passport")

// Passport config
require("./config/passport")(passport)

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// bodyParser
app.use(express.urlencoded({ extended: false }))

// Express session
app.use(session({
  secret: "secret",
  resave: true,
  saveUninitialized: true
}))

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Connect flash
app.use(flash())

// Global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg")
  res.locals.error_msg = req.flash("error_msg")
  next()
})

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