const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
require('../modulos/Ususario')
const Usuario = mongoose.model('usuarios')
const crypt = require('bcryptjs');

//controle de acesso
const {isSuper} = require('../helpers/IsSuper')
const {isUser} = require('../helpers/IsUser')


router.get('/', isUser, (req,res)=>{
    let name = req.user.nome;
    let email = req.user.email;
    let sup
    (req.user.isSuper == 1)? sup = true : sup = false
    res.render('super', {name: name, sup: sup, email: email})
})
router.get('/cadastra', isSuper, (req,res)=>{
    res.render('cadastra')
})
router.get('/lista', isSuper, (req,res)=>{
    Usuario.find().lean()
        .then((usuarios)=>{
            res.render('lista', {usuarios: usuarios})
        })
        .catch((err)=>{
            req.flash('MSGerror', 'erro ao listar usuarios')
            res.redirect('/usuario')
            console.log(err)
        })
    ;
})
router.post('/validaCadastro', (req, res)=>{
    var erros = [];
    //validação
    if( !req.body.nome || 
        typeof(req.body.nome) == undefined || 
        req.body.nome.length < 3 || 
        !isNaN(parseFloat(req.body.nome))
    ){
        erros.push({texto: "nome inválido"});
    }
    if( !req.body.email || 
        typeof(req.body.email) == undefined || 
        req.body.email.length < 10
    ){
        erros.push({texto: "email inválido"});
    }
    if( !req.body.senha || 
        typeof(req.body.senha) == undefined || 
        req.body.senha.length < 8 || 
        req.body.senha != req.body.senha2
    ){
        erros.push({texto: "senha inválida"});
    }

    if(erros.length > 0){
        res.render("cadastra", {erros: erros});
    }else{
        Usuario.findOne({email: req.body.email})
            .then((usuario)=>{
                if(usuario){
                    req.flash('MSGerror', 'Já existe uma conta com este email');
                    res.redirect("/usuario/cadastra");
                    
                }else{
                    // define se é para criar um usuario comum ou um super
                    let usrSup = 0
                    if(req.body.comumSuper == 'super'){
                        usrSup = 1
                    }
                    const newUsr = new Usuario({
                        nome: req.body.nome,
                        email: req.body.email,
                        senha: req.body.senha,
                        isSuper: usrSup
                    });
                    //encriptografando
                    crypt.genSalt(10, (erro, salt)=>{
                        crypt.hash(newUsr.senha, salt, (erro, hash)=>{
                            if(erro){
                                req.flash('MSGerror', 'houve um erro ao salvar o usuario');
                                res.redirect("/usuario");
                            }
                            newUsr.senha = hash;
                            
                            newUsr.save()
                                .then(()=>{
                                    req.flash('MSGsuccess', 'usuario criado com sucesso');
                                    res.redirect("/usuario");
                                    
                                })
                                .catch((erro)=>{
                                    req.flash('MSGerror', 'houve um erro ao criar o usuario');
                                    res.redirect("/usuarios");
                                })
                            ;
                        })
                    });

                }
                
            }).catch(()=>{
                req.flash('MSGerror', 'Houve um erro interno');
                res.redirect("/");
            })
        ;
    }
})
router.get('/edita/:id', isSuper, (req, res)=>{
    Usuario.findOne({_id: req.params.id}).lean()
        .then((usuario)=>{
            res.render('edita', {usuario: usuario})
        })
        .catch((err)=>{
            req.flash('MSGerror', 'Este usuario não existe');
            res.redirect("/usuario");
            console.log(err);
        })
})
router.post('/upload', (req, res)=>{
    var erros = [];
    //validação
    if( !req.body.nome || 
        typeof(req.body.nome) == undefined || 
        req.body.nome.length < 3 || 
        !isNaN(parseFloat(req.body.nome))
    ){
        erros.push({texto: "nome inválido"});
    }
    if( !req.body.email || 
        typeof(req.body.email) == undefined || 
        req.body.email.length < 10
    ){
        erros.push({texto: "email inválido"});
    }
    if( !req.body.senha || 
        typeof(req.body.senha) == undefined || 
        req.body.senha.length < 8 || 
        req.body.senha != req.body.senha2
    ){
        erros.push({texto: "senha inválida"});
    }

    if(erros.length > 0){
        res.render("cadastra", {erros: erros});
    }else{
        Usuario.findOne({_id: req.body.id})
            .then((usuario)=>{
                usuario.nome = req.body.nome
                usuario.email = req.body.email
                usuario.senha = req.body.senha

                usuario.save()
                    .then(()=>{
                        req.flash('MSGsuccess', 'Usuario editado com sucesso')
                        res.redirect("/usuario")
                    })
                    .catch((err)=>{
                        req.flash('MSGerror', 'Erro interno')
                        res.redirect("/usuario")
                        console.log(err)
                    })
                ;
            })
            .catch((err)=>{
                req.flash('MSGerror', 'Usuario não encontrado');
                res.redirect("/usuario");
                console.log(err)
            })
        ;
    }
})
router.get("/remove/:id", isSuper, (req, res)=>{
    Usuario.remove({_id: req.params.id})
        .then(()=>{
            req.flash('MSGsuccess', 'Usuario deletado com sucesso')
            res.redirect("/usuario")
        })
        .catch((err)=>{
            req.flash('MSGerror', 'Não foi possivel Deletar o usuario')
            res.redirect("/usuario")
            console.log(err)
        })
})
router.get('/logout', (req,res)=>{
    req.logOut()
    req.flash('MSGsuccess', 'Deslogado com sucesso')
    res.redirect('/')
})

module.exports = router