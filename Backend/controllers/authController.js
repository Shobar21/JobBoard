import userModel from '../models/userModel.js'

// Register Controller
export const registerController = async (req, resp, next) => {
  try {
    const { name, lastName, email, password } = req.body

    // Validate input
    if (!name) return next('Name is required')
    if (!email) return next('Email is required')
    if (!password) return next('Password is required')
    if (password.length < 6)
      return next('Password length should be at least 6 characters')

    // Check if the user already exists
    const existingUser = await userModel.findOne({ email })
    if (existingUser) return next('Email already registered. Please login.')

    // Create new user
    const user = await userModel.create({ name, lastName, email, password })

    // Generate token
    const token = user.createJWT()
    // console.log('Your new token:', token)

    // Respond with user data
    return resp.status(201).json({
      success: true,
      message: 'User created successfully',
      user: {
        name: user.name,
        email: user.email,
        lastname: user.lastname,
        location: user.location,
      },
      token,
    })
  } catch (error) {
    next(error.message || 'Error occurred while registering')
  }
}

// Login Controller
export const loginController = async (req, resp, next) => {
  try {
    const { email, password } = req.body

    // Validate input
    if (!email || !password)
      return next('Please provide both email and password')

    // Find user by email
    const user = await userModel.findOne({ email }).select('+password')
    if (!user) return next('Invalid username or password')

    // Compare password
    const isMatch = await user.comparePassword(password)
    if (!isMatch) return next('Invalid username or password')

    // Generate token
    const token = user.createJWT()
    console.log('New Token:', token)

    // Respond with user data
    return resp.status(200).json({
      success: true,
      message: 'Login successful',
      user: {
        name: user.name,
        email: user.email,
        lastname: user.lastname,
        location: user.location,
      },
      token,
    })
  } catch (error) {
    next(error.message || 'Error occurred during login')
  }
}
