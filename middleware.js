module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        req.flash("error", "you are logged in to create listing");
        return res.redirect("/login");
    }
    next();
}