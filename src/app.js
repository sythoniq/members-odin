const path = require("node:path")
const passport = require("passport");
const session = require("express-session")
const pgSession = require("connect-pg-simple")(session)
const pool = require("./db/pool")
const express = require("express");
const app = express();

require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const assetsPath = path.join(__dirname, "publics")

app.use(express.static(assetsPath))
app.set("views", path.join(__dirname, 'views'))
app.set("view engine", "ejs");

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  store: new pgSession({
    pool: pool,
    tableName: "session"
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
  }
}));

require('./config/passport')

app.use(passport.session())

const index = require('./routes/index')
const messages = require("./routes/messages")

app.use('/', index);
app.use('/messages', messages)


app.listen(3000, (error) => {
  if (error) {
    throw(error)
  }
  console.log(`Server live on 3000`)
})
