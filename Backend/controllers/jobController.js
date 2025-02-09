import jobModel from '../models/jobModel.js'
import mongoose from 'mongoose'
import moment from 'moment'

//create job controller
export const createJobController = async (req, resp, next) => {
  const { company, position } = req.body
  if (!company || !position) {
    next('Please Provide All Fields')
  }
  req.body.createdBy = req.user.userId
  const job = await jobModel.create(req.body)
  resp.status(201).json({ job })
}

//get job controller
export const getAlljobController = async (req, res, next) => {
  //searching qyery base
  const { status, workType, search, sort } = req.query
  //conditions for searching filter
  const queryObject = {
    createdBy: req.user.userId,
  }
  //logic filters
  if (status && status !== 'all') {
    queryObject.status = status
  }

  if (workType && workType !== 'all') {
    queryObject.workType = workType
  }

  if (search) {
    queryObject.position = { $regex: search, $options: 'i' }
  }
  let queryResult = jobModel.find(queryObject)

  //sorting
  if (sort === 'latest') {
    queryResult = queryResult.sort('-createdAt')
  }
  if (sort === 'oldest') {
    queryResult = queryResult.sort('createdAt')
  }
  if (sort === 'a-z') {
    queryResult = queryResult.sort('position')
  }
  if (sort === 'z-a') {
    queryResult = queryResult.sort('-position')
  }

  //pagination
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 8
  const skip = (page - 1) * limit

  queryResult = queryResult.skip(skip).limit(limit)
  //job count
  const totalJobs = await jobModel.countDocuments(queryResult)
  const numOfPage = Math.ceil(totalJobs / limit)
  const jobs = await queryResult

  // const filter =
  //   req.user && req.user.userId ? { createdBy: req.user.userId } : {}
  // const jobs = await jobModel.find(filter)
  res.status(200).json({
    totalJobs,
    jobs,
    numOfPage,
  })
}

//update job controller
export const updateJobController = async (req, res, next) => {
  const { id } = req.params
  const { company, position } = req.body
  //validation
  if (!company || !position) {
    next('Please Provide All Fields')
  }
  //find job
  const job = await jobModel.findOne({ _id: id })
  //validation
  if (!job) {
    next(`no jobs found with this id ${id}`)
  }
  if (!req.user.userId === job.createdBy.toString()) {
    next('Your Not Authorized to update this job')
    return
  }
  const updateJob = await jobModel.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  })
  //res
  res.status(200).json({ updateJob })
}

//delete job controller
export const deleteJobController = async (req, res, next) => {
  const { id } = req.params
  //find job
  const job = await jobModel.findOne({ _id: id })
  //validation
  if (!job) {
    next(`No Job Found With This ID ${id}`)
  }
  if (!req.user.userId === job.createdBy.toString()) {
    next('Your Not Authorize to delete this job')
    return
  }
  await job.deleteOne()
  res.status(200).json({ message: 'Success, Job Deleted!' })
}

//stats job controller
export const statsjobControlller = async (req, resp) => {
  // console.log(`this userid: ${req.user.userId}`)

  const stats = await jobModel.aggregate([
    //search by user jobs
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId),
      },
    },
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
      },
    },
  ])

  //default stats
  const defaultStats = {
    pending: stats.length || 0,
    reject: stats.length || 0,
    interview: stats.length || 0,
  }

  //monthlyapplication stats
  let monthlyApplication = await jobModel.aggregate([
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId),
      },
    },
    {
      $group: {
        _id: {
          year: { $year: '$createdAt' },
          month: { $month: '$createdAt' },
        },
        count: {
          $sum: 1,
        },
      },
    },
  ])

  monthlyApplication = monthlyApplication
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item
      const date = moment()
        .month(month - 1)
        .year(year)
        .format('MMM Y')
      return { date, count }
    })
    .reverse()
  resp
    .status(200)
    .json({ totalJobs: stats.length, defaultStats, monthlyApplication })
}
