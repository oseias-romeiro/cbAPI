# Aplicação REST API

Este código é um CRUD de gerenciamento de usuarios desenvlvido em Node.js e MongoDb

## Recursos utilizados

- Node.js
- Expres.js
- MongoDb
- Mongoose
- JSON data
- Passport.js
- Bootstrap
- Handlebars

## Rotas da aplicação:

  ROTA                    |     HTTP(Verbo)   |      Descrição        | 
------------------------- | ----------------- | --------------------- | 
/                         |       GET         | Home                  | 
/login                    |       GET         | Login de usuario      | 
/login/google             |       GET         | Login com google      | 
/login/valida             |       POST        | Autentica com google  | 
/usuario/validaCadastro   |       POST        | Autentica usuario     | 
/usuario                  |       GET         | Tela de controle      | 
/usuario/cadastra         |       GET         | Cadastra um usuario   | 
/usuario/lista            |       GET         | Lista de ususarios    | 
/usuario/edita/:id        |       GET         | Edição ususarios      | 
/usuario/upload           |       POST        | Atualiza cadastro     | 
/usuario/remove/:id       |       GET         | Remoção de ususarios  | 
/usuario/logout           |       GET         | Logout de usuario     | 

## Pre-Requisitos

* **Node.Js**
* **MongoDB**

## Instalando dependências

Pelo cmd/terminal entre na pasta do prejeto e digite a seguite instrução:

```
npm install
```

## Executando a aplicação

Pelo CMD/terminal no mesmo caminho, inicie o server:

```
npm start
```

Agora, basta abrir a pagina: `http://localhost`

**Conta do super usuario:**
* Email: Super@gmail.com
* Senha: SuperUsuario

Obs.: Este email é apenas para testes, logo não podera fazer login com a conta do google usando essas credenciais. Para isso, faça o login como super usuario e cadastre um outro usuario com email valido.

Obs.: Só poderá fazer o login com a conta do google se essa conta realmente existir e se ela ja foi cadastrada por um super usuario

## Outras configurações

### Caso queira rodar o servidor em uma porta diferente:

* Basta modificar a linha 63 do arquivo principal (App.js)

Obs.: Se mudar a porta, a autenticação com contas do google não funcionará pois as urls mudaram.

### Configurando o banco de dados:

É importante salientar que a API precisa de um super usuario cadastrado no banco de dados previamente

* Instale o MongoDB
* Crie um banco de dados
* Modifique a linha 2 do arquivo db.js dentro da pasta ./config, colocando o link do banco de dados. Ex.: `mongodb://localhost/nome_do_banco`

#### cadastrando o super usuario inicial

* Dentro da pasta do projeto em ./routes, abra o arquivo usr.js e apague a função `isSuper` na linha 20, deixando a linha assim:

```
router.get('/cadastra', (req,res)=>{
```

* No navegador entre na rota `http://localhost:8081/usuario/cadastra` e faça o cadastro do super usuario (ative a opção Super no formulario)

* Volte na linha 20 do arquivo usr.js e coloque novamente a função isSuper (é ela que faz o controle de acesso a rota), deixando a linha assim:

```
router.get('/cadastra', isSuper, (req,res)=>{
```

End ;)