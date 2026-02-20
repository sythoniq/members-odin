const path = require("node:path")
const express = require("express")
const app = express()


const index = require("./routes/index")

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs")

app.use(express.urlencoded({extended: true}));



app.use("/", index);


app.listen(3000, (error) => {
  if (error) {
    console.error(error);
  }

  console.log("Server listening on 3000")
})
