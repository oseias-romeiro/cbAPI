# Aplicação REST API

Ete código é um CRUD desenvlvido em Node.js, Express e MongoDb

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
/login                    |       GET         | Login de usuario      | 
/login/google             |       GET         | Login com google      | 
/login/valida             |       POST        | Autentica com google  | 
/usuario/validaCadastro   |       POST        | Autentica usuario     | 
/usuario                  |       GET         | Tela de controle      | 
/usuario/cadastra         |       GET         | Cadastra um usuario   | 
/usuario/lista            |       GET         | lista de ususarios    | 
/usuario/edita/:id        |       GET         | editção ususarios     | 
/usuario/upload           |       POST        | atualiza cadastro     | 
/usuario/remove/:id       |       GET         | remoção de ususarios  | 
/usuario/logout           |       GET         | Logout de usuario     | 

## Pre-Requisitos

* **Node.Js**

p.s.: A base de dados do MongoDb, está sendo usada em nuvem

## Instalando dependências

Pelo cmd/terminal entre na pasta do prejeto e digite a seguite instrução:

```
npm install
```

## executando a aplicação

Pelo CMD/terminal no mesmo caminho, inicie o server

```
npm start
```

Agora, basta abrir a pagina: `http://localhost:8081/`

**Conta do super usuario:**
* Email: Super@gmail.com
* Senha: SuperUsuario
obs.: Este email é apenas para testes, logo não podera fazer login com a conta do google usando essas credenciais

## Outras configurações

### Caso queira rodar o servidor em uma porta diferente:

* Basta modificar a linha 63 do arquivo principal (App.js)

### Caso queira usar o banco de dados localmente

É importante salientar que a API precisa de um super usuario cadastrado no banco de dados previamente

* Precisa ter instaldo o MongoDb
* Crie um banco de dados
* Modifique a linha 49 do arquivo principal (App.js) colocando o link do banco de dados. Ex.: `mongodb://localhost/nome_do_banco`

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

End.