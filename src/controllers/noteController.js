const note = require("../models/note.js");

exports.getNotes = async function (req, res) {
    const payload = {
        user: {
            name: req.user.username
        },
        title: `${req.user.username} - Dashboard`,
        fileName: "notes.ejs"
    };

    try {
        if (!req.isAuthenticated)
            return res.redirect("/login");

        const notes = await note.find({ parent: req.user.id }).sort("-date");

        return res.render("layout", { ...payload, ... { notes: notes } });
    } catch (error) {
        return res.render("layout", { ...payload, ... { error: `Internal server error ${error}` } });
    }
}

exports.getNote = async function (req, res) {

}

exports.createNote = async function (req, res) {
    const payload = {
        user: {
            name: req.user.username,
            title: `${req.user.username} - Dashboard`,
            fileName: "notes.ejs"
        }
    };

    try {
        const { title, text } = req.body;

        note.create({
            user: req.user.id,
            title: title,
            text: text
        })
    } catch (error) {
        return res.render("layout", { ...payload, ... { error: `Internal server error ${error}` } });
    }
}

exports.editNote = async function (req, res) {
    const payload = {
        user: {
            name: req.user.username,
            title: `${req.user.username} - Dashboard`,
            fileName: "notes.ejs"
        }
    };

    try {


        note.updateOne({})
    } catch (error) {
        return res.render("layout", { ...payload, ... { error: `Internal server error ${error}` } });
    }
}
