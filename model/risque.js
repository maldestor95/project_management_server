//definition des schémas utilisés dans Mongoose
var mongoose = require('mongoose');

var Schema = mongoose.Schema;  

var RisqueSchema = new Schema({  
    description:{ type: String, required: true },
    type:{ type: String, required: false },
    risk_opp : { type: String, required: false },
    date_created: { type: Date, default: Date.now },
    origine:{ type: String, required: false },
    gravity: { type: Number, default: 1 },
    probability:{ type: Number, default: 1 },
    impact:{ type: String, required: false },
    impact_desc: { type: String },
    Status_open: { type: Boolean, default: true },
    preventive_action: { type: String },
    Leader:{ type: String }
});

module.exports=mongoose.model('Risque',RisqueSchema);