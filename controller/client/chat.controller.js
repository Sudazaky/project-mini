const Chat = require('../../models/chat.model');
const User = require('../../models/user.model');
// [GET] /chat
module.exports.index = async (req, res) => {
  const userId = res.locals.user.id;
  const fullName = res.locals.user.fullName;
  _io.once('connection', (socket) => {
    console.log('a user connected', socket.id);

    socket.on("CLIENT_SEND_MESSAGE", async (content) => {
      // Lưu vào database
      const chat = new Chat({
        userId: userId,
        content: content,
      });
      await chat.save();

      _io.emit("SERVER_RETURN_MESSAGE", {
        userId: userId,
        fullName: fullName,
        content: content
      });
    });

    // Typing
    socket.on("CLIENT_SEND_TYPING", async (type) => {
      socket.broadcast.emit("CLIENT_RETURN_TYPING", {
        userId: userId,
        fullName: fullName,
        type: type
      });
      
    });
    // End Typing
  });

  // Lấy data để trả về
  const chat = await Chat.find({deleted: false});
  for(const item of chat) {
    const user = await User.findOne({_id: item.userId});
    item.fullName = user.fullName;
  }
  res.render('client/pages/chat/index', {
    pageTitle: "Chat",
    chat: chat
  });
};