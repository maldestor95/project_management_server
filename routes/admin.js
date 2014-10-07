
//includes
var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res) {
  //affichage du panneau de controle des utilisateurs
  /*var db = route.req.db;
    var collection = db.get('users');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    })*/
    res.render('admin');
});
/*Get Hello World page. */
router.get('/helloworld',function(req,res){
	res.render('helloworld',{title:'Hello, World!'})
});





module.exports = router;
