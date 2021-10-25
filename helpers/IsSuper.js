module.exports = {
    isSuper: (req, res, next)=>{
        if(req.isAuthenticated() && req.user.isSuper == 1){
            return next();
        }
        if(req.isAuthenticated() && req.user.isSuper == 0){
            req.flash("MSGerror", "Acesso negado!")
            res.redirect('/usuario')
        }else{
            req.flash("MSGerror", "Faça o login!")
            res.redirect('/') 
        }
    }
}