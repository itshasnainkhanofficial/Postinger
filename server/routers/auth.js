import express from 'express'
import {register, login, getMe} from '../controllers/auth.js'
import { protect } from '../midddleware/auth.js'

// Initilization
const router = express.Router()

router.post("/register", register)

router.post("/login", login)

router.get("/me", protect , getMe)


export default router