import jwt from "jsonwebtoken";

export const generateToken = (payload) => {
  return jwt.sign(payload, "pm1DSA6MkuBiaA7bxYNiA8P3yypNqyb6W+faZOewf+k", {
    expiresIn: "1d",
  });
};

export const verifyToken = (payload) => {
  return jwt.verify(payload, "pm1DSA6MkuBiaA7bxYNiA8P3yypNqyb6W+faZOewf+k");
};
