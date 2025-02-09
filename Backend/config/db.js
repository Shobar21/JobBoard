import mongoose from 'mongoose'
const uri =
  'mongodb+srv://shoba:7ISvBH8GunexXSBL@cluster0.ppuy8.mongodb.net/jobportal?retryWrites=true&w=majority&tls=true&tlsInsecure=true'

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000, // Avoid long delays
      tls: true,
      tlsInsecure: true, // Bypass SSL issues
    })
    console.log(`MongoDB is running on ${mongoose.connection.host}`)
    console.log('MongoDB Connected successfully')
  } catch (err) {
    console.error('Connection error:', err)
    process.exit(1)
  }
}

export default connectDB
