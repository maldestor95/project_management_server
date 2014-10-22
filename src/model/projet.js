//definition du schéma projet utilisé dans Mongoose
var mongoose = require('mongoose');

var Schema = mongoose.Schema;  

var ProjetSchema = new Schema({  
    description:{ type: String, required: true }, //description du risque ou de l'opportunité
    Project_leader:{type:String},
    Status: { type: String } // open, closed, ...
});

module.exports=mongoose.model('Projet',ProjetSchema);