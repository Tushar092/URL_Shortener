const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    originalUrl : {type: String, required: true},
    shortCode: {type: String, required: true, unique: true},
    createdAt: {type: Date, default: Date.now}
});

const urlModel = mongoose.model("Url", urlSchema);

module.exports = urlModel;