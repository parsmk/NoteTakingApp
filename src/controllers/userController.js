const user = require("../models/user.js");
const auth = require("../auth.js");

exports.login = async function (req, res) {
    try {
        const { username, password } = req.body;

        const candidate = await user.findOne({ username });

        if (!candidate || !await candidate.comparePassword(password)) {
            return res.render("layout", { title: "Login", fileName: "login", error: "Invalid Credentials!" });
        }

        auth.initializeCookie(candidate, res);
        return res.redirect("/notes");
    } catch (err) {
        return res.render("layout", { title: "Login", fileName: "login", error: `Internal error ${err}` });
    }
}

exports.createUser = async function (req, res) {
    try {
        const { username, password, confirmPassword } = req.body;

        if (await user.findOne({ username }))
            return res.render("layout", { title: "Sign Up", fileName: "signUp", error: "Username exists!" });
        if (password !== confirmPassword)
            return res.render("layout", { title: "Sign Up", fileName: "signUp", error: "Passwords do not match." });

        const newUser = await user.create({ username, password });

        auth.initializeCookie(newUser, res);
        return res.redirect("/notes")
    } catch (err) {
        return res.render("layout", { title: "Sign Up", fileName: "signUp", error: `Internal error ${err}` });
    }
}

exports.signOutUser = function (req, res) {
    auth.deleteCookie(res);

    return res.redirect("/login");
}

exports.userById = async function (id) {
    return user.findById(id);
}
