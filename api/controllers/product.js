const Product = require("../models/product");

exports.product_get = async (req, res, next) => {
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
};

exports.product_create = async (req, res, next) => {
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
};

exports.product_update = async (req, res, next) => {
  const updateProduct = {
    name: req.body.name,
    price: req.body.price,
    productImage: req.file.path,
  };
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
};

exports.product_delete = async (req, res, next) => {
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
};
