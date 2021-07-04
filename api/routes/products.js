const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const multer = require("multer");
const fs = require("fs");

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

router.get("/", (req, res, next) => {
  Product.findAll()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.get("/:productId", async (req, res, next) => {
  await Product.findByPk(req.params.productId)
    .then((data) => {
      res.status(201).json({
        message: "You passed an ID",
        data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err,
      });
    });
});

router.post("/", upload.single("productImage"), async (req, res, next) => {
  const product = {
    name: req.body.name,
    price: req.body.price,
    productImage: req.file.path,
  };

  await Product.create(product)
    .then((data) => {
      res.status(201).json({
        message: "Handling POST requests to /products Success",
        createdProduct: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err,
      });
    });
});

router.put(
  "/:productId",
  upload.single("productImage"),
  async (req, res, next) => {
    const updateProduct = {
      name: req.body.name,
      price: req.body.price,
      productImage: req.file.path,
    };
    // console.log(updateProduct);
    await Product.findByPk(req.params.productId, { raw: true })
      .then((data) => {
        fs.unlink(data.productImage, (err) => {
          if (err) {
            res.status(500).json({
              message: err,
            });
          } else {
            Product.update(updateProduct, {
              where: {
                id: req.params.productId,
              },
            });
            res.status(201).json({
              message: "Handling PUT requests to /products Success",
              updatedProduct: updateProduct,
            });
          }
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: err,
        });
      });
  }
);

router.delete("/:productId", async (req, res, next) => {
  await Product.findOne({
    raw: true,
    where: {
      id: req.params.productId,
    },
  })
    .then((data) => {
      fs.unlink(data.productImage, (err) => {
        if (err) {
          res.status(500).json({
            message: err,
          });
        } else {
          Product.destroy({
            where: {
              id: data.id,
            },
          });
          res.status(201).json({
            message: "Handling DELETE requests to /products Success",
          });
        }
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err,
      });
    });
});

module.exports = router;
