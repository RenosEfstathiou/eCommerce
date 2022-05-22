import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';

import generateToken from '../utils/generateToken.js';

import User from '../models/userModel.js';

/**
 * @desc   Get User profile
 * @route  GET /api/users/profile
 * @access Private
 */
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    });
  } else {
    res.status(404);
    throw new Error('User not found!');
  }
});

/**
 * @desc   Get User profile
 * @route  GET /api/users/profiles/:id
 * @access Private
 */
const getUserProfileByUserId = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email
    });
  } else {
    res.status(404);
    throw new Error('User not found!');
  }
});

/**
 * @desc   Update User profile
 * @route  PUT /api/users/profiles
 * @access Private
 */
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  const { name, email, password } = req.body;

  if (user) {
    user.name = name || user.name;
    user.email = email || user.email;

    if (password) {
      user.password = password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id)
    });
  } else {
    res.status(404);
    throw new Error('User not found!');
  }
});

/**
 * @desc   Auth user & get token
 * @route  POST /api/users/login
 * @access Public
 */
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    });
  } else {
    res.status(401);
    throw new Error('Invalid credentials.');
  }
});

/**
 * @desc   Create a new user
 * @route  POST /api/users/register
 * @access Public
 */
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists!');
  }

  const user = await User.create({
    name,
    email,
    password
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data!');
  }
});

export { authUser, getUserProfile, getUserProfileByUserId, registerUser, updateUserProfile };
