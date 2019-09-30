const express = require("express");
const app = express();
const http = require("http");
const Server = http.Server(app);

app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.static("./static"));

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});

Server.listen(3000);
