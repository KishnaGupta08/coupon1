const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  requestType: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  details: { type: mongoose.Schema.Types.Mixed, required: true },
});

module.exports = mongoose.model("Log", logSchema);
