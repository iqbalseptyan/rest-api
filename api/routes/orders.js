const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Handling GET requests to /orders",
  });
});

router.get("/:orderId", (req, res, next) => {
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

router.post("/", (req, res, next) => {
  const order = {
    productId: req.body.productId,
    quantity: req.body.quantity,
  };
  res.status(201).json({
    message: "Handling POST requests to /orders",
    createdOrder: order,
  });
});

router.put("/:productId", (req, res, next) => {
  res.status(200).json({
    message: "Handling PUT requests to /orders",
  });
});

router.delete("/:productId", (req, res, next) => {
  res.status(200).json({
    message: "Handling DELETE requests to /orders",
  });
});

module.exports = router;
