import UserDao from "../daos/user.dao.js";
const userDao = new UserDao();

/* export const registerUser = async(req, res, next) => {
    try {
        const newUser = await userDao.registerUser(req.body);
        //console.log("Req.Body",req.body);
        //console.log("New User", newUser);
        if(!newUser) res.redirect('/error-register');
        else res.redirect('/');
    } catch (error) {
        next(error);
    }
};

export const loginUser = async(req, res, next) => {
    try {
        const userId = req.session.passport.user;
        const userExist = await userDao.getById(userId);
        if(userExist) {
            const user = {
                email: userExist.email,
                first_name: userExist.first_name,
                last_name: userExist.last_name,
                age: userExist.age
            }
            req.session.user = user;
            res.redirect('/api/products');
        } else res.redirect('/error-login')
    } catch (error) {
        next(error);
    }
};
 */
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

/* export const githubResponse = async (req, res, next) => {
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
  }; */