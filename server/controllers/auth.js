import User from "../model/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// desc     Register User
// route    POST /api/auth/register
// access   Public
export const register = async (req, res, next) => {
 
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Please fill all the fields");
    }

    const isUserExist = await User.findOne({ email });

    if (isUserExist) {
      res.status(400);
      throw new Error("User already exists");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user.id)
      });
    }
  } catch (error) {
    next(error);
  }
};

// desc     Login User
// route    POST /api/auth/login
// access   Public
export const login = async (req, res, next) => {

  try {
        const {email, password} = req.body

        const user = await User.findOne({email})

        if(!user){
            res.status(400);
            throw new Error("User does not exist.");
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            throw new Error("Password did not match.");
        }

        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id)
          })

    } catch (error) {
        next(error)
    }
  
};

// desc     Get User Data, it will get currect loggedin user
// route    GET /api/auth/me
// access   Private
export const getMe = async (req, res) => {
  res.status(200).json({ Message: "User Data" });
};




// Generate Token
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: "1d"
    })
}

// simplified code
// // desc     Register User
// // route    POST /api/auth/register
// // access   Public
// export const register = (req, res) => {
//     res.status(200).json({Message: "register working fine"})
// }

// // desc     Login User
// // route    POST /api/auth/login
// // access   Public
// export const login = (req, res) => {
//     res.status(200).json({Message: "login working fine"})
// }

// // desc     Get User Data, it will get currect loggedin user
// // route    GET /api/auth/me
// // access   Public
// export const getMe = (req, res) => {
//     res.status(200).json({Message: "User Data"})
// }
