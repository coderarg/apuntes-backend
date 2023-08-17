import UserDao from "../daos/user.dao.js";
const userDao = new UserDao();

export const logoutUser = async (req, res, next) =>{
    try {
        req.session.destroy((error) => {
            if(!error) res.render('login')
            else res.json({ message: error})
        })
        res.redirect('/');
    } catch (error) {
        next(error);
    }
}

export const githubResponse = async (req, res, next) => {
    try {
        console.log(req.user)
        const { first_name, last_name, email, isGithub } = req.user;
        res.json({
            msg: "Register/Login Github OK",
            session: req.session,
            userData: {
            first_name,
            last_name,
            email,
            isGithub,
            },
        });
    } catch (error) {
        next(error.message);
    }
};