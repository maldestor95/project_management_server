var mongoose = require('mongoose');

var db=mongoose.connection;

db.on('error', console.error);
db.once('open',function(){

    var userSchema = new mongoose.Schema({
      Name:  String,
      FirstName: String,
      project:[{Project_Name:String,rights:   String}]
      
    });

    var user=mongoose.model('user',userSchema);
    var admin=new user({
        Name:"DEP",
        FirstName:"Ludo",
        project:[
            {Project_Name:"Risk",rights:"Admin"},
            {Project_Name:"Management",rights:"Admin"}        
        ]
        });
    admin.save(function (err, fluffy) {
      if (err) return console.error(err);
    });
    user.find(function (err, ruser) {
      if (err) return console.error(err);
      console.log(ruser)
    })
    
    
   

});

mongoose.connect('localhost:27017/nodetest1');
