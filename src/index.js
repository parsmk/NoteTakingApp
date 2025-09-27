// Packages
const express = require("express");
const cors = require("cors");

// Local Modules
const auth = require("./auth.js");

// Config
const PORT = 3000;

// Middleware
const app = express();

app.use(cors());
app.use(express.json());
app.use(auth());

// Routes
app.use("/", require("./routes/login.js"));
app.use("/notes", require("./routes/notes.js"));

// Server
app.listen(PORT, () => console.log(`Server running on Port: ${PORT}\nhttp://localhost:${PORT}`));
