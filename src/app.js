const path = require("node:path")
const express = require("express")
const session = require("express-session")
const app = express()
require("dotenv").config();


const index = require("./routes/index")

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs")

app.use(express.urlencoded({extended: true}));

app.use(session({
  secret: "some secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
  }
}))

app.use("/", index);


app.listen(3000, (error) => {
  if (error) {
    console.error(error);
  }

  console.log("Server listening on 3000")
})
