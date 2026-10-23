// middleware to authenticate JWT tokens

const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) {
    return res.status(401).json({ message: "Not authorized" });
  }

  const token = header.startsWith("Bearer ") ? header.split(" ")[1] : header;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role }
    next();
  } catch {
    // Code-15 bug: calls next() when JWT verification fails instead of 401
    // next(); // old code 
    return res.status(401).json({ message: "Invalid or expired token" }); // fix : return 401 instead of calling next()
  }
};

module.exports = authMiddleware;
