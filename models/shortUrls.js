const mongoose = require("mongoose");
const shortid = require("shortid");

const shortUrlsSchema = new mongoose.Schema({
    full: {
        type: String,
        required: true
    },
    short: {
        type: String,
        required: true,
        default: shortid.generate
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    }
})

exports.default = mongoose.model("shortUrls", shortUrlsSchema);