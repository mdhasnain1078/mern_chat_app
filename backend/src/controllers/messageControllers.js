import { asyncHandler } from "../utils/asyncHandler.js";
import { Message } from "../models/messageModel.js";
import { User } from "../models/userModel.js";
import { Chat } from "../models/chatModel.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";

//@description     Get all Messages
//@route           GET /api/Message/:chatId
//@access          Protected
const allMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");
    res
      .status(200)
      .json(new ApiResponse(200, messages, "all messages fetch successfully"));
  } catch (error) {
    throw new ApiError(400, error.message);
  }
});

//@description     Create New Message
//@route           POST /api/Message/
//@access          Protected
const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  try {
    var message = await Message.create(newMessage);

    message = await message.populate("sender", "name pic");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

    res
      .status(200)
      .json(new ApiResponse(200, message, "message send successfully"));
  } catch (error) {
    throw new ApiError(400, error.message);
  }
});

export { allMessages, sendMessage };
