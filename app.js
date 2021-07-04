const express = require("express");
const app = express();

const productRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/orders");

app.use("/uploads", express.static("uploads"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

module.exports = app;
