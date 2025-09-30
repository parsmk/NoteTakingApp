const router = require("express").Router();
const userController = require("../controllers/userController.js");

router.get("/signup", (req, res) => {
    res.render("layout", { title: "Sign Up", fileName: "signup.ejs" });
});

router.post("/signup", userController.createUser);

router.get("/login", (req, res) => {
    res.render("layout", { title: "Login", fileName: "login.ejs" });
});

router.post("/login", userController.login);

router.post("/signout", userController.signOutUser);

module.exports = router;
