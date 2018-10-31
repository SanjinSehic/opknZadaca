var express = require('express');
var router = express.Router();
var korisnici = [];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Todos' });
});

router.get('/login', (req,res) => {
  if(req.cookies._id) {
    res.redirect('/todos');
    return;
  }
  res.render('login');
});

router.post('/login', (req,res) => {
  let logovan = false;
  korisnici.map(k =>{
    if(k.username == req.body.username && k.pasword == req.body.pasword)
    {
      res.cookie('_id', req.body.username);
      logovan = true;
      return;
    }
  });
  if(logovan) res.redirect('/todos');
  else res.redirect('/login');
});

router.get('/register',(req,res) => {
  if(req.cookies._id)
  {
    res.redirect('/todos');
    return;
  }
  res.render('register');
});

router.post('/register', (req,res) => {
  var user ={
    username: req.body.username,
    pasword: req.body.pasword,
    todos: [],
  }
  let nesto = false;
  korisnici.map(k =>{

    if(k.username == req.body.username)
    {
      nesto = true;
      return;
    }
  });

  
  if(nesto)
  {
    res.render('postregister', {msg: "vec ste registrovani"});
  }
  else
  {
    res.cookie("_id", req.body.username);
    korisnici.push(user);
    res.redirect("/todos");
  }

});

router.get('/todos' ,(req,res) => {
  if(req.cookies._id) {
    korisnici.map(k => {
      if(k.username == req.cookies._id)
        res.render("todos", {todos:k.todos});
    return;
  })
  };
  res.redirect('/login');
});

router.post('/todos/add', (req,res) =>{
  korisnici.map(k => {
    if(req.cookies._id == k.username)
    {
      k.todos.push(req.body.todo);
      return;
    }
  })
  res.redirect('/todos');
});

router.get('/logout', (req,res) =>{
  res.clearCookie("_id").redirect('/');
})



module.exports = router;
