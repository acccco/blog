const path = require("path");
const express = require("express");
const nunjucks = require("nunjucks");
const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const mainRouter = require("./routes/main");
const redirectRouter = require("./routes/redirect");
const wallpaperRouter = require("./routes/wallpaper");
const zebraRouter = require("./routes/zebra-editor");

// 执行定时任务
const scheduleJob = require("./schedule/");
scheduleJob();

const app = express();

app.set("view engine", "njk");
app.set("views", path.join(__dirname, "views"));
nunjucks.configure(path.join(__dirname, "views"), {
  autoescape: true,
  express: app
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// router
app.use("/", mainRouter);
app.use("/", redirectRouter);
app.use("/api/wallpaper", wallpaperRouter);
app.use("/zebra", zebraRouter);

// static
app.use(express.static(path.join(__dirname, "../public")));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
