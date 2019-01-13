const express = require("express");
const app = express();

const port = 3000;
const { projects } = require("./data.json");

app.use("/static", express.static("public"));
app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.locals.projects = projects;
  res.render("index.pug", projects);
});

app.get("/about", (req, res) => {
  res.render("about.pug");
});

app.get("/projects/:id", (req, res) => {
  res.locals.projects = projects[req.params.id];
  res.render("project.pug", projects);
});

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  console.log(`There was an error. (${err.message})`);
  res.render("error.pug", { err });
  console.dir(err);
  next(err);
});

app.listen(port, () => {
  console.log(`The portfolio site is running at localhost:${port}`);
});
