const Conversation = require("./conversation");
const User = require("./user");
const Message = require("./message");
const UserConvo = require("./userConvo");
const ReadReceipt = require("./readReceipt")

// associations

User.hasMany(UserConvo);
Conversation.hasMany(UserConvo);
UserConvo.belongsTo(User);
UserConvo.belongsTo(Conversation)
Message.belongsTo(Conversation);
Conversation.hasMany(Message);
Message.hasMany(ReadReceipt);
ReadReceipt.belongsTo(Message);

module.exports = {
  User,
  Conversation,
  Message,
  UserConvo,
  ReadReceipt,
};
