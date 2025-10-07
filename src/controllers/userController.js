const user = require("../models/user.js");
const auth = require("../auth.js");
const { body, validationResult } = require("express-validator");

const layoutPath = "Auth/authLayout"

exports.login = async function (req, res) {
    const payload = {
        title: "Login",
        fileName: "login"
    }

    try {
        await sanitate(req);
        const { username, password } = req.body;
        const candidate = await user.findOne({ username });

        if (!candidate || !await candidate.comparePassword(password)) {
            return res.render(layoutPath, { ...payload, ... { error: "Invalid Credentials!" } });
        }

        auth.initializeCookie(candidate, res);
        return res.redirect("/notes");
    } catch (err) {
        return res.render(layoutPath, { ...payload, ... { error: `Internal error ${err}` } });
    }
}

exports.createUser = async function (req, res) {
    const payload = {
        title: "Sign Up",
        fileName: "signUp"
    }

    try {
        await sanitate(req);
        const { username, password, confirmPassword } = req.body;
        if (await user.findOne({ username }))
            return res.render(layoutPath, { ...payload, ... { error: "Username exists!" } });
        if (password !== confirmPassword)
            return res.render(layoutPath, { ...payload, ... { error: "Passwords do not match." } });

        const newUser = await user.create({ username, password });

        auth.initializeCookie(newUser, res);
        return res.redirect("/notes")
    } catch (err) {
        return res.render(layoutPath, { ...payload, ... { error: `Internal error ${err}` } });
    }
}

exports.signOutUser = function (req, res) {
    auth.deleteCookie(res);
    return res.redirect("/login");
}

async function sanitate(req) {
    await body("username")
        .trim()
        .escape()
        .notEmpty().withMessage("Username is required")
        .isLength({ min: 3, max: 50 }).withMessage("Username must be between 3-50 characters")
        .run(req);

    await body("password")
        .trim()
        .escape()
        .notEmpty().withMessage("password is required")
        .isLength({ min: 5, max: 20 }).withMessage("Password must be between 5-20 characters")
        .run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty())
        throw new Error(`Validation error!\nErrors:\n${errors.array().map(e => e.msg).join(", ")}`);
}
