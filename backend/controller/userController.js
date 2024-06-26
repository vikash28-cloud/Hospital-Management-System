import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../middleware/errorMiddleware.js";
import { User } from "../models/userSchema.js";
import { generateToken } from "../utils/jwtToken.js";

export const patientRegister = catchAsyncErrors(async (req, res, next) => {
    const {
        firstName,
        lastName,
        email,
        phone,
        nic,
        dob,
        password,
        gender,
        role,
    } = req.body;

    if (!firstName || !lastName || !email || !phone || !nic || !password || !gender || !role) {
        return next(new ErrorHandler("please fill full form", 400));
    }

    let user = await User.findOne({ email });

    if (user) {
        return next(new ErrorHandler("user Already registered with this email", 400))
    }

    user = await User.create({
        firstName,
        lastName,
        email,
        phone,
        nic,
        dob,  //not entered 
        password,
        gender,
        role,
    });
    generateToken(user,"user registered",200,res);
    res.status(200).json({
        success: true,
        message: "user regesterd successfully"
    })
});

export const login = catchAsyncErrors(async (req, res, next) => {
    const { email, password, confirmPassword, role } = req.body;
    if (!email || !password || !confirmPassword || !role) {
        return next(new ErrorHandler("please fill all credentials", 400));
    }
    if (password !== confirmPassword) {
        return next(new ErrorHandler("password and confirm password doesn't match", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHandler("Invalid Email or Password", 400));
    }

    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Email or Password", 400));
    }

    if (role !== user.role) {
        return next(new ErrorHandler("user with this role is not found", 400));
    }

    res.status(200).json({
        success: true,
        message: "user loggedIn successfully"
    })

})
