const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.get("/", async (req, res, next) => {
  await User.findAll()
    .then((data) => {
      res.status(201).json({
        message: "Handling GET requests to /users Success",
        data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err,
      });
    });
});

router.post("/login", async (req, res, next) => {
  await User.findOne({ where: { email: req.body.email }, raw: true })
    .then((user) => {
      if (user === null) {
        return res.status(404).json({
          message: "Email not found, user doesn't exist",
        });
      }
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
          return res.status(404).json({
            message: "Auth failed, wrong password",
          });
        }
        if (result) {
          const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_KEY,
            { expiresIn: "1h" }
          );
          return res.status(200).json({
            message: "Auth successful",
            token,
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

router.post("/signup", async (req, res, next) => {
  await User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (user) {
        return res.status(409).json({
          message: "Email already exists",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              message: err,
            });
          } else {
            const user = {
              email: req.body.email,
              password: hash,
            };
            User.create(user)
              .then((data) => {
                res.status(201).json({
                  message: "Handling POST requests to /users Success",
                  createdUser: data,
                });
              })
              .catch((err) => {
                res.status(500).json({
                  message: err,
                });
              });
          }
        });
      }
    })
    .catch((err) => {
      tus(500).json({
        message: err,
      });
    });
});

router.delete("/:idUser", async (req, res, next) => {
  await User.destroy({
    where: {
      id: req.params.idUser,
    },
  })
    .then((data) => {
      res.status(201).json({
        message: "User deleted",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err,
      });
    });
});

module.exports = router;
