import express from 'express'
import userAuth from '../middlewares/authMiddleware.js'

import {
  createJobController,
  deleteJobController,
  getAlljobController,
  statsjobControlller,
  updateJobController,
} from '../controllers/jobController.js'

const router = express.Router()

//create job post
router.post('/create-job', userAuth, createJobController)

//get job get
router.get('/get-job', userAuth, getAlljobController)

//update job patch/ put
router.patch('/update-job/:id', userAuth, updateJobController)

//delete job
router.delete('/delete-job/:id', userAuth, deleteJobController)

//stats job
router.get('/stats-job', userAuth, statsjobControlller)
export default router
