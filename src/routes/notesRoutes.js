const router = require("express").Router();
const noteController = require("../controllers/noteController.js");
const auth = require("../auth.js");

const layoutPath = "Notes/portalLayout";

router.get("/", auth.authenticate(), noteController.getNotes);

router.get("/create", auth.authenticate(), (req, res) => {
    return res.render(layoutPath, {
        title: `${req.user.username} - Create`,
        user: { name: req.user.username },
        fileName: "noteForm.ejs",
        action: "create"
    })
});

router.post("/create", auth.authenticate(), noteController.createNote);

router.get("/:id", auth.authenticate(), async (req, res) => {
    const note = await noteController.getNote(req, res);

    if (!note)
        return;

    return res.render(layoutPath, {
        title: `${note.title} - Edit`,
        user: { name: req.user.username },
        note: note,
        fileName: "note.ejs"
    });
});

router.get("/edit/:id", auth.authenticate(), async (req, res) => {
    const note = await noteController.getNote(req, res);

    if (!note)
        return;

    return res.render(layoutPath, {
        title: `${note.title} - Edit`,
        user: { name: req.user.username },
        note: note,
        fileName: "noteForm.ejs",
        action: "edit"
    })
});

router.post("/edit/:id", auth.authenticate(), noteController.editNote);

router.get("/delete/:id", auth.authenticate(), noteController.deleteNote);

module.exports = router;
