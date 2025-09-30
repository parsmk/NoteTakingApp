
exports.getNotes = async function (req, res) {
    console.log(req.user);

    const payload = {
        user: {
            name: req.user.username
        },
        title: `${req.user.username} - Dashboard`,
        fileName: "notes.ejs"
    }
    return res.render("layout", payload)
} 
