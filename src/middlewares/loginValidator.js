export const validateLogIn = (req, res, next) => {
    console.log(req.session);
    if (req.session.user && req.session.user.loggedIn) {
        next();
    } else {
        res.status(401).json({ msg: "no estas autorizado" });
    }
};