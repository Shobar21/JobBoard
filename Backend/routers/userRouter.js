import express from 'express'
import userAuth from '../middlewares/authMiddleware.js'
import { updateUserController } from '../controllers/userController.js'

const router = express.Router()

//GET USERs

//Update user
router.put('/update-user', userAuth, updateUserController)

export default router
