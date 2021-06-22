// const router = require('express').Router();
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');

// router.use('/swagger-ui', swaggerUi.serve);
// router.get('/swagger-ui', swaggerUi.setup(swaggerDocument));

// const express = require("express");

// const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

// app.use("/swagger-ui", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = (app) =>
  app.use("/swagger-ui", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
