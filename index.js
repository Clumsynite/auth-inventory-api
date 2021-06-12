require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const logger = require("morgan");
const http = require("http");
const path = require("path");
const fs = require("fs");
const showdown = require("showdown");
const passport = require("passport");

const routes = require("./routes");
const { decode } = require("./middlewares/jwt");

const converter = new showdown.Converter();

const app = express();
const server = http.createServer(app);

require("./config");

app.use(helmet());
app.use(logger("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// CORS ----
app.use(
  cors({
    credentials: true,
    origin: true,
    methods: ["POST", "GET", "PUT", "DELETE", "OPTIONS"],
  })
);
app.set("trust proxy", 1);
// ---- CORS

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  fs.readFile("./README.md", "utf8", (err, data) => {
    if (err) throw err;
    res.render("index", { data: converter.makeHtml(data) });
  });
});

app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

app.use("/auth", routes.auth);
app.use("/user", routes.user);
app.use("/inventory", decode, routes.inventory);
app.use("/util", routes.util);

app.use("*", (req, res) =>
  res.status(404).json({
    success: false,
    error: "API endpoint doesn't exists",
  })
);

server.listen(process.env.PORT || 5000);
/** Event listener for HTTP server "listening" event. */
server.on("listening", () => {
  // eslint-disable-next-line no-console
  console.log(
    `Listening on port :: http://localhost:${server.address().port}/`
  );
});
