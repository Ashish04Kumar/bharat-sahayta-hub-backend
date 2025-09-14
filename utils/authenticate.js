import jwt from "jsonwebtoken";

export const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      return res.status(403).json({
        status: false,
        message: "Unauthorized",
      });
    }
    const user = jwt.verify(token, process.env.SECRET_KEY);
    req.user = user;
    next();
  } catch (err) {
    res.status(403).json({
      status: false,
      message: "Unauthorized",
    });
  }
};
