const mysql = require('mysql2');

class AlunoDao {
    constructor(){ 
        this._connection = mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            password: 'januario19541978',
            database: 'crud_node', 
          });
        
    }
    list(){
        return new Promise( (resolve, reject) => {
            this._connection.query(
                'SELECT * FROM alunos', 
                function(err, results, fields) {
                    if(err) {
                        reject(err);
                    }else{
                        resolve(results);
                    }
                }
            )
        })

 


    }

    save(aluno){ 
        return new Promise( (resolve, reject) => {
            this._connection.query(
                'insert into alunos (nome, email, curso) values (?,?,?)',[aluno.nome, aluno.email,aluno.curso], 
                function(err, results, fields) {
                    if(err) {
                        reject(err);
                    }else{
                        resolve(results);
                    }
                }
            )
        })
    } 

    update(aluno){ 
        return new Promise( (resolve, reject) => {
            this._connection.query(
                'update alunos set nome=?,  email=?, curso=? where id=?',[aluno.nome, aluno.email,aluno.curso, aluno.id], 
                function(err, results, fields) {
                    if(err) {
                        reject(err);
                    }else{
                        resolve(results);
                    }
                }
            )
        })
    } 

    findById(id){
        return new Promise( (resolve, reject) => {
            this._connection.query(
                'SELECT * from alunos where id =?', [id], 
                function(err, results, fields) {
                    if(err) {
                        reject(err);
                    }else{
                        resolve(results);
                    }
                }
            )
        })
    }

    delete(id){ 
        return new Promise( (resolve, reject) => {
            this._connection.query(
                'delete from alunos where id =?', [id], 
                function(err, results, fields) {
                    if(err) {
                        reject(err);
                    }else{
                        resolve(results);
                    }
                }
            )
        })
    } 


} 
module.exports = AlunoDao 