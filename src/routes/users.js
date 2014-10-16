var express = require('express');
var router = express.Router();

router.use(function(req,res,next){
	console.log(req.method,req.url);
	next();
})

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});
router.get('/login', function(req, res) {
  res.render('./include/login_form', { title: 'login form' });
});

// route with parameters (http://localhost:8080/hello/:name)
router.get('/hello/:name', function(req, res) {
	res.send('hello ' + req.params.name + '!');
});
router.route('/ll')
  .get(function(req,res,next){
  	res.render('./include/login_form', { title: 'login form' });
  })
  .post(function(req,res,next){
  	//res.send('ll post');
  	console.log(req.body.login);
  	res.render('./include/login_proc', { "login": req.body.login,"pwd":req.body.password });
  })

  
  
 router.route('/admin_users')
  .get(function(req,res,next){
    var us={FirstName:"oo",LastName:"aa"};
  	res.render('./admin_users', { Myus:us,title: 'admin_users',login:'john' });
  })
  .post(function(req,res,next){
  	//res.send('ll post');
    //verify that the login/pwd does not exist in the database
    
    //if not; send an error message
  	console.log(req.body.login);
    var us={FirstName:"toto",LastName:"tata"};
  	res.render('./admin_users', { Myus:us,title: 'admin_users post received',login: req.body.login,pwd:req.body.password });
  })
module.exports = router;
