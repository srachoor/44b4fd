const Sequelize = require("sequelize");
const db = require("../db");

const ReadReceipt = db.define("read_receipt", {
    isReadByRecipient: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue:false,
    },
    messageRecipientId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
});

module.exports = ReadReceipt;