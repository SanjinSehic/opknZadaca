var express = require('express');
var router = express.Router();
var con = require('../helpers/dbcon');
var crypto = require('crypto'), algorithm = 'aes-256-ctr', password = 'TodoApp';

function encrypt(text){
  var cipher = crypto.createCipher(algorithm,password)
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}
 
function decrypt(text){
  var decipher = crypto.createDecipher(algorithm,password)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}

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
  /*korisnici.map(k =>{
    if(k.username == req.body.username && k.pasword == req.body.pasword)
    {
      res.cookie('_id', req.body.username);
      logovan = true;
      return;
    }
  });
  if(logovan) res.redirect('/todos');
  else res.redirect('/users/login');
  */

  con.query(`SELECT name from users where name='${req.body.username}' and pasword='${encrypt(req.body.pasword)}'`, (err,result) => {
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
  var user ={
    username: req.body.username,
    pasword: req.body.pasword,
    todos: [],
  }

  let sql = `INSERT INTO users (name, pasword) VALUES ('${req.body.username}', '${encrypt(req.body.pasword)}')`;
  con.query(sql, (err, result) => {
    if(err) console.log(err);
    console.log(result);
    res.redirect("/");
  });

  /*if(nesto)
  {
    res.render('postregister', {msg: "vec ste registrovani"});
  }
  else
  {
    res.cookie("_id", req.body.username);
    korisnici.push(user);
    res.redirect("/todos");
  }*/
});

module.exports = router;
