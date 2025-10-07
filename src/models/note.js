const mongodb = require("mongoose");

const noteSchema = new mongodb.Schema({
    title: { type: String, required: true, minLength: 1, maxLength: 50 },
    date: { type: Date, default: Date.now },
    text: { type: String, required: true, maxLength: 2000 },
    user: { type: mongodb.Schema.Types.ObjectId, ref: "User" }
})

module.exports = mongodb.model("Note", noteSchema);
