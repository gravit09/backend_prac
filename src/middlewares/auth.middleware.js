import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";

//next keyword is used for middleware to tell my work is done now move to next middleware
export const verifyJWT = asyncHandler(async (req, res, next) => {
  /* we are checking wether user has cookie if he have cookie we get his access token and if not we are 
 getting user header because header contain user access token in variable called bearer that why we are removing 
 bearer because we only want access token */
  try {
    const token =
      req.cookie?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "unauthorised request");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(401, "Invalid access Token");
    }

    req.user = user;
    next();
  } catch (err) {
    throw new ApiError(404, err?.message || "Inavalid access Token");
  }
});
