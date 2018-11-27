var express = require('express');
var router = express.Router();

router.get('/',  (req,res) =>{
    res.cookie("_id", '').redirect('/');
  })
  
  module.exports = router;