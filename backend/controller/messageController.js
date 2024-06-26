import { Message } from "../models/messageSchema.js";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../middleware/errorMiddleware.js"

export const sendMessage = catchAsyncErrors(async (req, res, next) => {
    const { firstName, lastName, email, phone, message } = req.body;
    
    if (!firstName || !lastName || !email || !phone || !message) {
       return next( new ErrorHandler("please fill full form ",400))
    }
    await Message.create({
        firstName,
        lastName,
        email,
        phone,
        message,  
    });
    
    res.status(200).json({
        success: true,
        message: "message send successfully",
    })
})
