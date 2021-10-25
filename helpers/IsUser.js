module.exports = {
    isUser: (req, res, next)=>{
        if(req.isAuthenticated()){
            return next();
        }
        req.flash("MSGerror", "Faça o login!")
        res.redirect('/')
    }
}