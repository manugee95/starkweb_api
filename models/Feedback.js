const mongoose = require("mongoose")

const Feedback = mongoose.model("Feedback", new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title: {type: String, required: true},
    rating: {type: Number, required: true}
}, {timestamps: true}))

module.exports = Feedback 