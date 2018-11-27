var express = require('express');
var router = express.Router();
var db = require('../helpers/dbcon');
var crypto = require('crypto'), algorithm = 'aes-256-ctr', password = 'TodoApp';
const { todo, user ,Sequelize} = require('../models');

function decrypt(text){
  var decipher = crypto.createDecipher(algorithm,password)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}

router.get('/' ,async(req,res) => {
    
  /* sql = `Select todo from users
  inner join todos on users.id = todos.userId
  where username = '${decrypt(req.cookies._id)}';`

  db.all(sql, function(err,result){
    console.log(result);
    res.render('todos',{todos:result});
  })*/
  try {
    let todo1 = await user.findOne({
      where: {username: decrypt(req.cookies._id)},
      include: [{
        model: todo,
        where: {userId: Sequelize.col('user.id')}
      }]
    })
    console.log(todo1);
    res.render('todos',{todos1:todo1});
  } catch (error) {
    console.log(error);
  }
});

router.post('/add', async(req,res) =>{
  /*let sql2 = `select id from users where username = '${decrypt(req.cookies._id)}';`
  db.get(sql2, (err,result) =>{
    let sql = `INSERT INTO todos (todo,userId) VALUES ('${req.body.todo}', ${result.id})`
    db.run(sql, (err,result)=>{
      res.redirect('/todos');
    })
  })*/

  try {
    let user1 = await user.findOne({where: {
      username: decrypt(req.cookies._id)
    },
    attributes: ['id']})
    console.log(user1.dataValues.id);
    let todos = await todo.create({
        todo: req.body.todo,
        userId: user1.dataValues.id
    })
    res.redirect('/todos');
  } catch (error) {
    console.log(error);
  }
});

router.delete('/deleteTodo/:name', async (req,res) =>{
  /*let todo = req.params.name;
  let sql = `delete from todos
  where todo = '${todo}';`
  
  db.run(sql,(err,result) =>{
    res.send("todoDeleted");
  })*/
  try {
    let todoDlete = await todo.destroy({
      where: {
        todo: req.params.name,
      }
    });
    console.log("todo deleted");
    res.send("todoDeleted");
  } catch (error) {
    console.log(error)
  }
})

  module.exports = router;