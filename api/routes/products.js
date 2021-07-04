const express = require("express");
const fs = require("fs");
const multer = require("multer");
const router = express.Router();
const Product = require("../models/product");
const checkAuth = require("../middleware/check-auth");

const ProductController = require("../controllers/product");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
  fileFilter: fileFilter,
});

router.get("/", checkAuth, async (req, res, next) => {
  await Product.findAll()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

router.get("/:productId", checkAuth, ProductController.product_get);

router.post(
  "/",
  checkAuth,
  upload.single("productImage"),
  ProductController.product_create
);

router.put(
  "/:productId",
  upload.single("productImage"),
  ProductController.product_update
);

router.delete("/:productId", ProductController.product_delete);

module.exports = router;
