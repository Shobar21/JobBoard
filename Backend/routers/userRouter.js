import express from 'express'
import userAuth from '../middlewares/authMiddleware.js'
import {
  getUserController,
  updateUserController,
} from '../controllers/userController.js'

const router = express.Router()

//routes
// GET USER DATA || POST
router.post('/getUser', userAuth, getUserController)

//Update user
router.put('/update-user', userAuth, updateUserController)

export default router
