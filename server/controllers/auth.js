import User from '../model/User.js'

// desc     Register User
// route    POST /api/auth/register
// access   Public
export const register = (req, res) => {
    res.status(200).json({Message: "register working fine"})
}

// desc     Login User
// route    POST /api/auth/login
// access   Public
export const login = (req, res) => {
    res.status(200).json({Message: "login working fine"})
}