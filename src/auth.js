const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const jwt = require("jsonwebtoken");

const strategyOpts = {
    jwtFromRequest: (req) => {
        let token = null;
        if (req && req.cookies) {
            token = req.cookies['jwt'];
        }

        return token;
    },
    secretOrKey: process.env.secret
}

const cookieOpts = {
    httpOnly: true,
    sameSite: "lax"
}

passport.use(new JWTStrategy(strategyOpts, async function (payload, done) {
    return done(null, payload);
}));

exports.authenticate = function () {
    return (req, res, next) => {
        passport.authenticate("jwt", { session: false }, (err, user) => {
            if (err) return next(err);

            if (!user) {
                req.isAuthenticated = false;
                return next();
            }

            req.user = user;
            req.isAuthenticated = true;

            return next();
        })(req, res, next);
    }
}

exports.initializeCookie = function (candidate, res) {
    const token = jwt.sign(
        {
            id: candidate.id,
            username: candidate.username
        },
        process.env.secret,
        { expiresIn: "1h" }
    );

    return res.cookie("jwt", token, cookieOpts);
}

exports.deleteCookie = function (res) {
    res.clearCookie("jwt", cookieOpts);
}

exports.setup = [
    passport.initialize(),
]
