const jwt = require("jsonwebtoken");

module.exports.authMiddleware = async (req, res, next) => {
  const { authToken } = req.cookies;
  if (authToken) {
    const deCodeToken = await jwt.verify(authToken, "ASHDFKLAHSD2323");
    req.myId = deCodeToken.id;
    next();
  } else {
    res.status(400).json({
      error: {
        errorMessage: ["Please login first"],
      },
    });
  }
};
