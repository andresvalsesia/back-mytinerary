const mongoose=require('mongoose');

const itinerarySchema= new mongoose.Schema({
    country: {type:mongoose.Types.ObjectId, ref:'cities'},
    name: {type:String, required:true},
    userName:{type:String},
    img: {type:String, required:true},
    price:{type:String,required:true},
    duration:{type: Number, required:true},
    hastag: {type:Array,required:true},
    comments:[{
        date:{type:Date},
        comment:{type:String},
        userID:{type:mongoose.Types.ObjectId,ref:"users"}   
    }],
    like:{type:Array},
    activity:{type:Array, required:true}
})

const Itinerary=mongoose.model('itineraries',itinerarySchema);

module.exports=Itinerary;