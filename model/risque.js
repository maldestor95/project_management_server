//definition des schémas utilisés dans Mongoose
var mongoose = require('mongoose');

var Schema = mongoose.Schema;  

var RisqueSchema = new Schema({  
    description:{ type: String, required: true }, //description du risque ou de l'opportunité
    type:{ type: String, required: false },
    risk_opp : { type: String, required: false },
    date_created: { type: Date, default: Date.now },
    origine:{ type: String, required: false }, // origine Interne ou Externe au projet
    gravity: { type: Number, default: 1 }, //gravité 1=min; 3=max
    probability:{ type: Number, default: 1 }, // probabilité: 1=peu probable; 3 fort probable
    impact:{ type: String, required: false }, //cout/délai/qualité
    impact_desc: { type: String }, //description de l'impact
    Status_open: { type: Boolean, default: true }, // ouvert ou fermé
    preventive_action: { type: String }, //
    Leader:{ type: String } // responsable du risque
});

module.exports=mongoose.model('Risque',RisqueSchema);