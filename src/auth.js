const passport = require("passport");
const bcrypt = require("bcrypt");

export function configureSession() {
    return session({
        name: "sid",
        secret: process.env.secret,
        resave: false,
        saveUninitialized: false
    })
}

export function setupPassport() {

}

export function auth() {
    return [
        configureSession(),
        passport.initialize(),
        passport.session()
    ]
}
