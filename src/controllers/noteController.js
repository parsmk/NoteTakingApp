const model = require("../models/note.js");
const { body, validationResult } = require("express-validator");
const mongodb = require("mongoose");

const layoutPath = "Notes/portalLayout";

exports.getNotes = async function (req, res) {
    const payload = {
        user: {
            name: req.user.username
        },
        title: `${req.user.username} - Dashboard`,
        fileName: "notes.ejs"
    };
    try {
        const notes = await model.find({ user: req.user.id }).sort("-date");

        return res.render(layoutPath, { ...payload, ... { notes: notes } });
    } catch (error) {
        return res.render(layoutPath, { ...payload, ... { error: `Internal server error ${error}` } });
    }
}

exports.getNote = async function (req, res) {
    const payload = {
        user: {
            name: req.user.username
        },
        title: `Invalid Note`,
        fileName: "note.ejs"
    }

    try {
        if (!mongodb.Types.ObjectId.isValid(req.params.id))
            throw new Error("Invalid note ID format");

        const note = await model.findById(req.params.id);

        if (!note)
            throw new Error("Note not found!");

        return note;
    } catch (error) {
        res.render(layoutPath, { ...payload, ... { error: `Internal server error ${error}` } });
        return null;
    }
}

exports.createNote = async function (req, res) {
    const payload = {
        user: {
            name: req.user.username
        },
        title: `${req.user.username} - Create`,
        fileName: "noteForm.ejs",
        action: "create"
    };

    try {
        await sanitate(req);
        const { title, text } = req.body;

        await model.create({
            user: req.user.id,
            title: title,
            text: text
        });

        return res.redirect("/notes");
    } catch (error) {
        return res.render(layoutPath, { ...payload, ... { error: `Internal server error ${error}` } });
    }
}

exports.editNote = async function (req, res) {
    const note = exports.getNote(req, res);
    if (!note)
        return;

    const payload = {
        user: {
            name: req.user.username
        },
        fileName: "noteForm.ejs",
        title: `${note.title} - Edit`,
        action: "edit"
    };

    try {
        await sanitate(req);

        await model.updateOne({ _id: req.params.id }, { title: req.body.title, text: req.body.text, date: Date.now() });

        return res.redirect("/notes");
    } catch (error) {
        return res.render(layoutPath, { ...payload, ... { error: `Internal server error ${error}` } });
    }
}

exports.deleteNote = async function (req, res) {
    const payload = {
        user: {
            name: req.user.username
        },
        title: `${req.user.username} - Dashboard`,
        fileName: "notes.ejs"
    };

    try {
        await model.deleteOne({ _id: req.params.id });

        return res.redirect("/notes");
    } catch (error) {
        return res.render(layoutPath, { ...payload, ... { error: `Internal server error ${error}` } });
    }
}

async function sanitate(req) {
    await body("title")
        .trim()
        .escape()
        .notEmpty().withMessage("Title is required")
        .isLength({ max: 50 }).withMessage("Title cannot exceed 50 characters")
        .run(req);

    await body("text")
        .trim()
        .escape()
        .notEmpty().withMessage("Text is required")
        .isLength({ max: 2000 }).withMessage("Note cannot exceed 2000 characters")
        .run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty())
        throw new Error(`Validation error!\nErrors:\n${errors.array().map(e => e.msg).join(", ")}`);
}
