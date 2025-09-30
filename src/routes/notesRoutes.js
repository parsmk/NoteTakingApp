const router = require("express").Router();
const noteController = require("../controllers/noteController.js");
const auth = require("../auth.js");

router.get("/", auth.authenticate(), noteController.getNotes);

router.get("/{id}", auth.authenticate(), noteController.getNote);

router.post("/create", auth.authenticate(), noteController.createNote);

router.post("/edit/{id}", auth.authenticate(), noteController.editNote);

module.exports = router;
