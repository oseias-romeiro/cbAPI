//carregando modulos
const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport')
require('./config/auth')(passport)
require('./config/googleAuth')(passport)

const login = require("./routes/login")
const usr = require('./routes/usr')

//config
    //Sessão
        app.use(session({
            secret: 'chavaqwer1234',
            resave: true,
            saveUninitialized: true
        }));
    // passport
        app.use(passport.initialize())
        app.use(passport.session())

    //flash
        app.use(flash());
        app.use( (req, res, next) => {
            res.locals.MSGsuccess = req.flash('MSGsuccess');
            res.locals.MSGerror = req.flash('MSGerror');
            res.locals.error = req.flash('error')
            res.locals.user = req.user || null
            next()
        });
    //MBodyParser
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(bodyParser.json());
    //handlebars
        app.engine('handlebars', handlebars({default: 'main'}));
        app.set('view engine', 'handlebars');
    //public
        app.use(express.static(path.join(__dirname, "public")));
    //mongoose
        mongoose.Promise = global.Promise;
        //mongodb://localhost/projeto
        mongoose.connect(
            'mongodb+srv://CocoBambu:APIcb1357@cluster0.8c2la.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
        )
            .then( () => {console.log('mongo conectado')})
            .catch( (err)=>{console.log('erro: '+ err)})
        ;

//rotas
    app.get('/', (req, res)=>{
        res.render('index');
    });
    app.use('/login', login);
    app.use('/usuario', usr);
    
//porta
const PORT = 8081
app.listen(PORT, ()=>{
    console.log('Server running!')
    console.log('http://localhost:8081/')
});