const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')

// model de usuario
require('../modulos/Ususario')
const Usuario = mongoose.model('usuarios')

module.exports = (passport)=>{
    passport.use(new GoogleStrategy({
        clientID: '535430362084-amaj346dd229vh7eksei4s9jhca9otlt.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: "http://localhost:8081/login/google/callback/"
    }, function(accessToken, refreshToken, profile, done) {
        Usuario.findOne({ email: profile.emails[0].value })
            .then((usuario)=>{
                if(!usuario){
                    return done(null, false, {message: "Esta conta não existe"})
                }
                return done(null, usuario)
            })
        ;
    }))
    passport.serializeUser(function(usuario, done) {
        done(null, usuario.id);
    });
    passport.deserializeUser(function(id, done) {
        Usuario.findById(id, function(err, usuario) {
            done(err, usuario);
        });
    });
}