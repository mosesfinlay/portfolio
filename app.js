const express = require("express");
const app = express();

const port = 3000;
const { projects } = require("./data.json");

// You can access anything in the public folder via "/static"
app.use("/static", express.static("public"));
// You can render the pug templates use the filename without ".pug"
app.set("view engine", "pug");

// Home route
app.get("/", (req, res) => {
  res.locals.projects = projects;
  res.render("index", projects);
});

// About route
app.get("/about", (req, res) => {
  res.render("about");
});

// Projects route
app.get("/projects/:id", (req, res) => {
  // Project JSON to be passed to the "project" template
  res.locals.projects = projects[req.params.id];
  res.render("project", projects);
});

// If the route requested does not exist show an error
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  console.log(`There was an error. (${err.message})`);
  res.render("error", { err });
  next(err);
});

// Listens to the port variable
app.listen(port, () => {
  console.log(`The portfolio site is running at localhost:${port}`);
});
