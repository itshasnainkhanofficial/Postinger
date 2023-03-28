import jwt from "jsonwebtoken";
import User from "../model/User.js";

export const protect = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      res.status(401);
      throw new Error("Access Denaid.");
    }

    // Get token from header
    let token = req.headers.authorization.split(" ")[1];

    if (!token) {
        res.status(401);
        throw new Error("Access Denaid.");
      }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from the token
    req.user = await User.findById(decoded.id).select('-password') // so we can access user by req.user in any protected route, purpose of -password is we don't want password althogh its hashed but we don't want
      next()
  } catch (error) {
    next(error);
  }
};

// another method
// export const verifyToken = async (req, res, next) => {
//     try {
//         let token = req.header("Authorization")

//         if(!token){
//             return res.status(403).send("Access Denied")
//         }

//         if(token.startsWith("Bearer ")){
//             token = token.slice(7, token.length).trimLeft();

//         }

//         const verified = jwt.verify(token, process.env.JWT_SECRET)

//         req.user = verified // could not understand this

//         next()
//     } catch (error) {
//         res.status(500).json({error : error.message})
//     }
// }
