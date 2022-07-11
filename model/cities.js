const mongoose=require('mongoose');

const citiesSchema= new mongoose.Schema({
    country: {type:String,required:true},
    city: {type:String, required:true},
    img: {type:String, required:true},
    description: {type:String, required:true}
})

const Citie=mongoose.model('cities',citiesSchema);

module.exports=Citie;