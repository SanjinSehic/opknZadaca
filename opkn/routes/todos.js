var express = require('express');
var router = express.Router();
var db = require('../helpers/dbcon');
var crypto = require('crypto'), algorithm = 'aes-256-ctr', password = 'TodoApp';

function decrypt(text){
  var decipher = crypto.createDecipher(algorithm,password)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}

router.get('/' ,(req,res) => {
    
  let sql = `Select todo from users
  inner join todos on users.id = todos.userId
  where username = '${decrypt(req.cookies._id)}';`

  db.all(sql, function(err,result){
    console.log(result);
    res.render('todos',{todos:result});
  })
});

router.post('/add', (req,res) =>{
  let sql2 = `select id from users where username = '${decrypt(req.cookies._id)}';`
  db.get(sql2, (err,result) =>{
    let sql = `INSERT INTO todos (todo,userId) VALUES ('${req.body.todo}', ${result.id})`
    db.run(sql, (err,result)=>{
      res.redirect('/todos');
    })
  })
});

router.delete('/deleteTodo/:name', (req,res) =>{
  let todo = req.params.name;
  let sql = `delete from todos
  where todo = '${todo}';`
  
  db.run(sql,(err,result) =>{
    res.send("todoDeleted");
  })
})

  module.exports = router;