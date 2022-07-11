const mongoose=require('mongoose');

const activitySchema= new mongoose.Schema({
    country:{type:mongoose.Types.ObjectId,ref:'itineraries'},
    activity:{type:Array,required:true}
})

const Activity=mongoose.model('activitis',activitySchema);

module.exports=Activity;