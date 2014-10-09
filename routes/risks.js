//route de gestion des risques

var express = require('express');
var router = express.Router();
var Risque = require('../model/risque');

router.use(function(req,res,next){
	//console.log(req.method,req.url);
	next();
})

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('Risks management');
});

router.route('/risk')
  .get(function(req,res,next){
  	Risque.find(function(err, risque) {
      if (err)
        res.send(err);

      res.json(risque);
    });
  })
  .post(function(req,res,next){
    var risque= new Risque();
    risque.description=req.body.description;   
    risque.type=req.body.type;
    risque.risk_opp =req.body.risk_opp;
    risque.date_created=req.body.date_created;
    risque.origine=req.body.origine;
    risque.gravity=req.body.gravity;
    risque.probability=req.body.probability;
    risque.impact=req.body.impact;
    risque.impact_desc=req.body.impact_desc;
    risque.Status_open=req.body.Status_open;
    risque.preventive_action=req.body.preventive_action;
    risque.Leader=req.body.Leader;

    console.log("description= "+ risque.description)   ;

    risque.save(function(err,risk_just_saved) {
      if (err)
        res.send(err);
      else
        //on cherche le risque dans la bdd pour retourner son entrée au client
        Risque.findById(risk_just_saved, function(err, risque) {
          if (err)
            res.send(err);
          res.json(risque);
        });
        //res.json({ message: 'risque created!' });
    });
    //res.send('création du risque dans la bdd' + risque.description);
  })

router.route('/risk/:risk_id')
  // get the risque with that id (accessed at GET http://localhost:3000/risks/risk/:risque_id)
  .get(function(req, res) {
    Risque.findById(req.params.risk_id, function(err, risque) {
      if (err)
        res.send(err);
      res.json(risque);
    });
  })

  // update the risque with this id (accessed at PUT http://localhost:3000/risks/risk/:risque_id)
  .put(function(req, res) {
    // use our risque model to find the risque we want
    Risque.findById(req.params.risk_id, function(err, risque) {

      if (err)
        res.send(err);
      else {
        risque.description = req.body.description;  // update the risque info
        //res.json({'param':req.body.description});
        // save the risque
        risque.save(function(err) {
          if (err)
            res.send(err);

          res.json({ message: 'risque updated!' });
        });
      };
    });
  })

  // delete the risque with this id (accessed at DELETE http://localhost:3000/risks/risk/:risk_id)
  .delete(function(req, res) {
    Risque.remove({
      _id: req.params.risk_id
    }, function(err, risque) {
      if (err)
        res.send(err);

      res.json({ message: 'Successfully deleted' });
    });
  });


module.exports = router;
