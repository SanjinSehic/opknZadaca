var express = require('express');
var router = express.Router();
var db = require('../helpers/dbcon');
var encrypt = require('../helpers/encrypt');
var {user} = require('../models')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', (req,res) => {
   if(req.cookies._id) {
    res.redirect('/todos');
    return;
  } 
  res.render('login');
});

router.post('/login', async(req,res) => {

  /*db.each(`SELECT username from users where username='${req.body.username}' and password='${encrypt(req.body.pasword)}'`, (err,result) => {
    if(err) throw err;
    res.cookie('_id', encrypt(req.body.username));
    res.redirect('/todos');
  }); */
  try {
   let user1 = await user.findOne({
      where: {
        username: req.body.username,
        password: encrypt(req.body.pasword)
      },
      attributes: ['username']
    })
    if(user1) {
      res.cookie('_id', encrypt(req.body.username));
      res.redirect('/todos');
    } else {
      res.redirect("/");
    }
  }
  catch (err) {
      console.log(err);
  }

});

router.get('/register',(req,res) => {
  if(req.cookies._id)
  {
    res.redirect('/todos');
    return;
  } 
  res.render('register');
});

router.post('/register', async(req,res) => {
  try{
    let user1 = await user.create({
      username: req.body.username,
      password: encrypt(req.body.pasword)
    })
    res.redirect("/");
  }
  catch(err){
    console.log(err);
  }
});

module.exports = router;
