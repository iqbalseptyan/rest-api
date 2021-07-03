const express = require("express");
const router = express.Router();
const db = require("../config/config");
const Product = require("../models/product");

router.get("/", (req, res, next) => {
  Product.findAll()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.get("/:productId", (req, res, next) => {
  const id = req.params.productId;

  if (id === "special") {
    res.status(200).json({
      message: "You discovered the special ID",
      id: id,
    });
  } else {
    res.status(200).json({
      message: "You passed an ID",
    });
  }
});

router.post("/", async (req, res, next) => {
  // console.log(req.body);
  const product = {
    name: req.body.name,
    price: req.body.price,
  };

  await Product.create(product)
    .then((data) => {
      res.status(201).json({
        message: "Handling GET requests to /products Success",
        createdProduct: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err,
      });
    });
});

router.put("/:productId", async (req, res, next) => {
  const newName = req.body.name;
  const newPrice = req.body.price;
  await Product.update(
    { name: newName, price: newPrice },
    {
      where: {
        id: req.params.productId,
      },
    }
  )
    .then((data) => {
      data.splice(0, 1, newName, newPrice);
      res.status(201).json({
        message: "Handling PUT requests to /products Success",
        updatedProduct: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err,
      });
    });
});

router.delete("/:productId", async (req, res, next) => {
  await Product.destroy({
    where: {
      id: req.params.productId,
    },
  })
    .then((data) => {
      res.status(201).json({
        message: "Handling DELETE requests to /products Success",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err,
      });
    });
});

module.exports = router;
