var express = require('express');
var router = express.Router();

router.get('/' ,(req,res) => {
  /*  if(req.cookies._id) {
      korisnici.map(k => {
        if(k.username == req.cookies._id)
          res.render("todos", {todos:k.todos});
      return;
    })
    };
    res.redirect('/login'); */
    res.render('todos',{todos: ['todo']});
  });
  
  router.post('/add', (req,res) =>{
    korisnici.map(k => {
      if(req.cookies._id == k.username)
      {
        k.todos.push(req.body.todo);
        return;
      }
    })
    res.redirect('/todos');
  });

  module.exports = router;