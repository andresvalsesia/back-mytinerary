const mongoose=require('mongoose');

const userSchema= new mongoose.Schema({
    name: {type:String,required:true},
    surname:{type:String,required:true},
    email:{type:String,required:true},
    photoUser:{type:String,required:true},
    country:{type:String,required:true},
    password:{type:Array,required:true},
    from:{type:Array},
    uniqueString:{type:String,required:true},
    verification:{type:Boolean,required:true}
})

const User=mongoose.model('users',userSchema);

module.exports=User;