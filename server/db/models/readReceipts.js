const Sequelize = require("sequelize");
const db = require("../db");

const ReadReceipts = db.define("read_receipts", {
    isReadByRecipient: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue:false,
    }
});

module.exports = ReadReceipts;