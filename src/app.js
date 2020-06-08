const express = require("express");
const app = express();
const userRoutes = require("../src/routes/users");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");

//Conectando no Banco de Dados
dotenv.config();
mongoose.connect(
  ` mongodb+srv://${process.env.NAME}:${process.env.PW}@unidesc-pw-h0qqm.mongodb.net/test?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan("dev"));
app.use(cors());

// Configurando o CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type,  Accept,  Authorization"
  );

  if (req.method == "OPTIONS") {
    req.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    return res.status(200).json({});
  }
  next();
});

app.use("/users", userRoutes);

// Tratando os Status 404 & 500
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    Message: error.messsage,
  });
});

module.exports = app;
