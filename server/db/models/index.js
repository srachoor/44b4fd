const Conversation = require("./conversation");
const User = require("./user");
const Message = require("./message");
const UserConvoBridge = require("./userConvoBridge");
const ReadReceipts = require("./readReceipts")

// associations

User.hasMany(UserConvoBridge);
Conversation.hasMany(UserConvoBridge);
UserConvoBridge.belongsTo(User);
UserConvoBridge.belongsTo(Conversation)
Message.belongsTo(Conversation);
Conversation.hasMany(Message);
Message.hasMany(ReadReceipts);
User.hasMany(ReadReceipts);
ReadReceipts.belongsTo(Message);
ReadReceipts.belongsTo(User, {as: "message_recipient"});

module.exports = {
  User,
  Conversation,
  Message,
  UserConvoBridge,
  ReadReceipts,
};
