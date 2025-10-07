const mongodb = require("mongoose");
const bcrypt = require("bcrypt");

const SALT = 10;

const userSchema = new mongodb.Schema({
    username: { type: String, required: true, unique: true, minLength: 3, maxLength: 50 },
    password: { type: String, required: true },
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, SALT);
    }

    next();
});

module.exports = mongodb.model("User", userSchema);
