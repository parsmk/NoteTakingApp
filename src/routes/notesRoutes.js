const router = require("express").Router();
const noteController = require("../controllers/noteController.js");
const auth = require("../auth.js");

router.get("/", auth.authenticate(), noteController.getNotes);

module.exports = router;
