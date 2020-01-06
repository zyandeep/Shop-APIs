const jwt = require("jsonwebtoken");

async function checkAuth(req, res, next) {
  try {
    let token = undefined;
    if (req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
    }
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    next();
  }
  catch (error) {
    error.status = 401;
    next(error);
  }
}

module.exports = checkAuth;
