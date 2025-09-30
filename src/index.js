// Packages
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();

// Local Modules
const auth = require("./auth.js");

// Config
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(auth.setup);

// Routes
app.use("/", require("./routes/userRoutes.js"));
app.use("/notes", require("./routes/notesRoutes.js"));

app.get("/", auth.authenticate(), (req, res) => {
    if (req.isAuthenticated) {
        return res.redirect("/notes");
    } else {
        return res.redirect("/login");
    }
})

// Establish Connections
mongoose
    .connect("mongodb://localhost:27017/noteTakingApp")
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("DB Error: ", err));

app.listen(PORT, () => console.log(`Server running on Port: ${PORT}\nhttp://localhost:${PORT}`));
