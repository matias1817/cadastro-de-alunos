require('marko/node-require');
var markoExpress = require('marko/express');

const AlunoDao = require('./dao/aluno-dao');
const dao = new AlunoDao(); 

const bodyParser = require('body-parser');

const express = require('express');
const app = express();

app.use(markoExpress()); 

app.use(bodyParser.urlencoded()) 
const session = require('express-session'); 
const flash = require('connect-flash'); 
app.use(session({ 
    secret:'geeksforgeeks', 
    saveUninitialized: true, 
    resave: true
})); 
  
app.use(flash()); 

app.get('/', function (req, res) { 

    let response = {
        error_message: req.flash('error'),
        success_message: req.flash('success'), 
        results: []
    } 
    console.log(response)

    dao.list().then( (results) => { 
        response.results = results;
        res.marko(require('./templates/alunos.marko'),
        response
        );
    }).catch((err) => {
            console.log(err);
            response.error_message.push('Ocorreu um erro');
            res.marko(require('./templates/alunos.marko'), response
            );
        })
    
}); 
app.get('/form', function (req,res){
    res.marko(require('./templates/form.marko'))
}); 
app.get('/form/:id', function (req, res) {

     dao.findById(req.params.id).then((result) => {
         if(result.length > 0){
             aluno = result[0];
             res.marko(require('./templates/form.marko'), aluno);
            }else{
                req.flash('error', 'não foi encontrado aluno com id = ' + req.params.id);
                req.redirect('/');
            }
     }).catch((err) => {
         console.log(err);
         req.flash('error', 'ocorreu um erro ao buscar o aluno de id = ' + req.params.id);
         res.redirect('/')
     })


    }); 

app.get('/alunos/delete/:id', function (req,res) {
    dao.delete(req.params.id).then((result) => {
        req.flash('success', 'usuario removido com sucesso')
        res.redirect('/')
    }).catch((err) => {
        console.log(err)
        req.flash('error', 'ocorreu um erro ao remover o usuario') 
        res.redirect("/")
    })
}); 
app.post('/alunos', function (req,res){ 
    if(req.body.id){
    dao.update(req.body).then((result)=> {
        req.flash('success', 'dados do aluno atualizados com sucesso.')
        res.redirect('/')
    }).catch( (err)=> {
        console.log(err);
        req.flash('error', 'ocorreu um erro ao atualizar os dados do aluno '+ aluno.nome);
        res.redirect('/')
    })}else{
        dao.save(req.body).then((result) => {
            req.flash('success', 'aluno salvo com sucesso.')
            res.redirect('/')
    }).catch((err) => {
        req.flash('error', 'ocorreu um erro ao salvar os dados do aluno.') 
        res.redirect('/');
    })
        

    } 
})

app.listen(3000, '0.0.0.0', function () {
    console.log('servidor iniciado ');
}); 