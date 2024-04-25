import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/userModel.js";
import generateToken from "../config/generateToken.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";

//@description     Get or Search all users
//@route           GET /api/user?search=
//@access          Public
const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  return res
    .status(200)
    .json(new ApiResponse(200, users, "fetch user successfully"));
});

//@description     Register new user
//@route           POST /api/user/
//@access          Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    throw new ApiError(400, "Please Enter all the Feilds");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    throw new ApiError(400, "User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  if (user) {
    return res.status(200).json(
      new ApiResponse(
        200,
        {
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          pic: user.pic,
          token: generateToken(user._id),
        },
        "user register successfully"
      )
    );
  } else {
    throw new ApiError(400, "User not found");
  }
});

//@description     Auth the user
//@route           POST /api/users/login
//@access          Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    return res.status(200).json(
      new ApiResponse(
        200,
        {
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          pic: user.pic,
          token: generateToken(user._id),
        },
        "user login successfully"
      )
    );
  } else {
    throw new ApiError(400, "Invalid Email or Password");
  }
});

export { allUsers, registerUser, authUser };
