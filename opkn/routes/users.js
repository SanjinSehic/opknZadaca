var express = require('express');
var router = express.Router();
var db = require('../helpers/dbcon');
var encrypt = require('../helpers/encrypt');

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

router.post('/login', (req,res) => {

  db.each(`SELECT username from users where username='${req.body.username}' and password='${encrypt(req.body.pasword)}'`, (err,result) => {
    if(err) throw err;
    res.cookie('_id', encrypt(req.body.username));
    res.redirect('/todos');
  });
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
  let sql = `INSERT INTO users (username, password) VALUES ('${req.body.username}', '${encrypt(req.body.pasword)}')`;
  db.each(sql, (err, result) => {
    if(err) console.log(err);
    res.redirect("/");
  });
});

module.exports = router;
