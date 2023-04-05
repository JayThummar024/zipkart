const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwtToken");

const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const findUser = await User.findOne({ email });
  if (!findUser) {
    // create new user
    const newUser = await User.create(req.body);
    res.json(newUser);
  } else {
    //user with email already exists
    throw new Error("User already exists!!");
  }
});

//Login User
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const foundUser = await User.findOne({ email });

  if (foundUser && (await foundUser.isPasswordMatched(password))) {
    const { _id, first_name, last_name } = foundUser;
    res.json({
      _id,
      first_name,
      last_name,
      email,
      token: generateToken(_id),
    });
  } else {
    throw new Error("Invalid Credentials.");
  }
});

//Get All Users
const getUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    throw new Error(error);
  }
});

//Get single user
const getUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.json(user);
  } catch (error) {
    throw new Error(error);
  }
});

//Get single user
const deleteUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    res.json({
      deletedUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

//Upadte a user
const updateUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  try {
    const user = await User.findOneAndUpdate(
      _id,
      {
        first_name: req?.body?.first_name,
        last_name: req?.body?.last_name,
        email: req?.body?.email,
      },
      {
        new: true,
      }
    );
    res.json(user);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { createUser, loginUser, getUsers, getUser, deleteUser, updateUser };
