var createError = require("http-errors");
var express = require("express");
var dotenv = require("dotenv");
var path = require("path");
const cors = require("cors");
var logger = require("morgan");
const helmet = require("helmet");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

dotenv.config();

const routes = require("./app/routes");
const authRoutes = require("./app/routes/authRoutes");
const { authenticateToken } = require("./app/helpers/authMiddleware");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// app.use(express.static(path.join(__dirname, "public")));

app.use(express.static(path.join(__dirname, "build")));

app.use("/login", authRoutes);
app.use("/api", authenticateToken, routes);

// Swagger Setup
const swaggerOptions = {
    explorer: true,
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "GIF Store API",
            version: "1.0.0",
            description: "API documentation for GIF Store"
        }
    },
    servers: [
        {
            url: "http://localhost:4000",
            description: "Local server"
        }
    ],
    apis: ["./app/routes/*.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

app.use(function (req, res, next) {
    res.status(404).send("404");
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    console.error(err.stack);
    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

// listen for requests
app.listen(process.env.PORT || 3000, (err) => {
    if (err) throw err;
    console.log("listening on port " + process.env.PORT);
});

module.exports = app;
