import mongoose from 'mongoose'

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, 'Company name is required'],
      maxlength: 100,
    },
    position: {
      type: String,
      required: [true, 'Job position is required'],
    },
    status: {
      type: String,
      enum: ['pending', 'reject', 'interview'],
      default: 'pending',
    },
    workType: {
      type: String,
      enum: ['full-time', 'part-time', 'internship', 'remote'],
      default: 'full-time',
    },
    workLocation: {
      type: String,
      default: 'Karachi',
      required: [true, 'Work location is required'],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: new mongoose.Types.ObjectId(),
    },
  },
  { timestamps: true }
)

export default mongoose.model('Job', jobSchema)
