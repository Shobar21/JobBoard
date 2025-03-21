import userModel from '../models/userModel.js'

export const updateUserController = async (req, res, next) => {
  try {
    const { name, email, lastname, location } = req.body

    // Check if all fields are provided
    if (!name || !email || !lastname || !location) {
      return res.status(400).json({ message: 'Please provide all fields' })
    }

    // Find the user by ID
    const user = await userModel.findOne({ _id: req.user.userId })
    // console.log(`user updateid ${req.user.userId}`)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Update user fields
    user.name = name
    user.lastname = lastname
    user.email = email
    user.location = location

    // Save the updated user
    await user.save()

    // Generate a new token
    const token = user.createJWT()

    res.status(200).json({
      user,
      token,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

// get user data
export const getUserController = async (req, res, next) => {
  try {
    const user = await userModel.findById({ _id: req.body.user.userId })
    user.password = undefined
    if (!user) {
      return res.status(200).send({
        message: 'User Not Found',
        success: false,
      })
    } else {
      res.status(200).send({
        success: true,
        data: user,
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({
      message: 'auth error',
      success: false,
      error: error.message,
    })
  }
}
