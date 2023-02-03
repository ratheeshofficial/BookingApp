import jwt from "jsonwebtoken";

export const verifytoken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.send("you are not authenticated");
  }

  jwt.verify(token, process.env.JWT, (err, user) => {
    // console.log(err);
    if (err) return res.send("Token is not valid");
    next();
  });
};

export const verifyUser = (req, res, next) => {
  verifytoken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.send("You are not authorized");
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifytoken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.send("You are not authorized");
    }
  });
};
