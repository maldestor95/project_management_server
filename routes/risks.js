//route de gestion des risques

var express = require('express');
var router = express.Router();
var Risque = require('../model/risque');

router.use(function(req,res,next){
	console.log(req.method,req.url);
	next();
})

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('Risks management');
});
router.route('/risk')
  .get(function(req,res,next){
  	res.send('lecture du risque depuis la bdd');
    var risque= new Risque();
  })
  .post(function(req,res,next){
    var risque= new Risque();
    risque.description=req.body.description; 
    console.log(risque.description)   ;
    risque.save(function(err) {
      if (err)
        res.send(err);

      res.json({ message: 'risque created!' });
    });
    //res.send('création du risque dans la bdd' + risque.description);
  })
  

router.get('/list', function(req, res) {
  res.send('Liste des risques contenus dans la bdd');
});

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
