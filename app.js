// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");
const path = require("path");
const partialsDirectory = path.join(__dirname, "views", "partials");
console.log(partialsDirectory);
hbs.registerPartials(partialsDirectory);

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// default value for title local
const capitalized = require("./utils/capitalized");
const projectName = "watchup";

app.locals.appTitle = `${capitalized(projectName)} created with IronLauncher`;

//---------------------------------------Routes
const index = require("./routes/index.routes");
app.use("/", index);

const shows = require("./routes/shows");
app.use(shows);

const movies = require("./routes/movies");
app.use(movies);

const tvshows = require("./routes/tvshows");
app.use(tvshows);

// app.use(require("./routes/shows"));

app.use(require("./routes/auth.routes"));
const loggedinRoutesRouter = require("./routes/loggedin.routes");
app.use(loggedinRoutesRouter);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;

// git branch joey
// git checkout koye
//
//git branch -a
// git pull origin joye
