const express = require("express");
const app = express();
require("dotenv").config();

const productRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/orders");
const userRoutes = require("./api/routes/users");

app.use("/uploads", express.static("uploads"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);

module.exports = app;
