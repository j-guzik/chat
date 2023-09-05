const formidable = require("formidable");
const validator = require("validator");
const registerModel = require("../models/authModel");
const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.userRegister = (req, res) => {
  const form = formidable();
  form.parse(req, async (err, fields, files) => {
    const { name, surname, email, password, confirmPassword } = fields;
    console.log("fields", fields);
    console.log("files", files);
    const { image } = files;
    const error = [];

    if (!name) {
      error.push("Please provide your name");
    }
    if (!surname) {
      error.push("Please provide your surname");
    }
    if (!email) {
      error.push("Please provide your email");
    }
    if (email && !validator.isEmail(email)) {
      error.push("Please provide your valid email");
    }
    if (!password) {
      error.push("Please provide your password");
    }
    if (!confirmPassword) {
      error.push("Please confirm your password");
    }
    if (password && confirmPassword && password !== confirmPassword) {
      error.push("Your password and confirm password are not the same");
    }
    if (password && password.length < 6) {
      error.push("Your password must have a minimum of 6 characters");
    }
    if (Object.keys(files).length === 0) {
      error.push("Please provide user image");
    }
    if (error.length > 0) {
      res.status(400).json({
        error: {
          errorMessage: error,
        },
      });
    } else {
      const getImageName = image.originalFilename;
      const randNumber = Math.floor(Math.random() * 99999);
      const newImageName = randNumber + getImageName;
      image.originalFilename = newImageName;

      const newPath =
        __dirname + `../../../frontend/public/images/${image.originalFilename}`;
      try {
        const checkUser = await registerModel.findOne({ email: email });
        if (checkUser) {
          res.status(404).json({
            error: {
              errorMessage: ["Your email already exist"],
            },
          });
        } else {
          fs.copyFile(files.image.filepath, newPath, async (error) => {
            if (!error) {
              const userCreate = await registerModel.create({
                name,
                surname,
                email,
                password: await bcrypt.hash(password, 10),
                image: files.image.originalFilename,
              });

              const token = jwt.sign(
                {
                  id: userCreate.id,
                  email: userCreate.email,
                  name: userCreate.name,
                  surname: userCreate.surname,
                  image: userCreate.image,
                  registerTime: userCreate.createdAt,
                },
                "ASHDFKLAHSD2323",
                {
                  expiresIn: "7d",
                }
              );
              const options = {
                expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
              };
              res.status(201).cookie("authToken", token, options).json({
                successMessage: "Register Successful",
                token,
              });
            } else {
              res.status(500).json({
                error: {
                  errorMessage: ["Internal Server Error"],
                },
              });
            }
          });
        }
      } catch (error) {
        res.status(500).json({
          error: {
            errorMessage: ["Internal Server Error"],
          },
        });
      }
    }
  });
};

module.exports.userLogin = async (req, res) => {
  console.log(req.body);
  const error = [];
  const { email, password } = req.body;
  if (!email) {
    error.push("Please provide your email");
  }
  if (!password) {
    error.push("Please provide your password");
  }
  if (email && !validator.isEmail(email)) {
    error.push("Please provide your valid email");
  }
  if (error.length > 0) {
    res.status(400).json({
      error: {
        errorMessage: error,
      },
    });
  } else {
    try {
      const checkUser = await registerModel
        .findOne({ email: email })
        .select("+password");

      if (checkUser) {
        const matchPassword = await bcrypt.compare(
          password,
          checkUser.password
        );

        if (matchPassword) {
          const token = jwt.sign(
            {
              id: checkUser._id,
              email: checkUser.email,
              name: checkUser.name,
              surname: checkUser.surname,
              image: checkUser.image,
              registerTime: checkUser.createdAt,
            },
            "ASHDFKLAHSD2323",
            {
              expiresIn: "7d",
            }
          );
          const options = {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          };
          res.status(200).cookie("authToken", token, options).json({
            successMessage: "Login Successful",
            token,
          });
        } else {
          res.status(400).json({
            error: {
              errorMessage: ["password not valid"],
            },
          });
        }
      } else {
        res.status(400).json({
          error: {
            errorMessage: ["email not found"],
          },
        });
      }
    } catch {
      res.status(404).json({
        error: {
          errorMessage: ["Internal server error"],
        },
      });
    }
  }
};

module.exports.userLogout = (req, res) => {
  res.status(200).cookie("authToken", "").json({
    success: true,
  });
};
