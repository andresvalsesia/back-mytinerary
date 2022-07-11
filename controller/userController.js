const User=require('../model/user');
const bcryptjs=require('bcryptjs');
var crypto = require('crypto');
const sendEmail=require('./sendMail');
const jwt=require('jsonwebtoken');

const userController ={

           signUpUsers: async(req, res)=>{

             let {name,surname,email,password,photoUser,country,from}=req.body.userData
            
           
             try{

                const user= await User.findOne({email: email})
                const verification=false;
                const uniqueString=crypto.randomBytes(15).toString('hex')

                if(user) {

                   if(user.from.indexOf(from)!==-1) {
                    res.json({success:false,from:'signup',message:'You have already registered please log in'})
                   }
                   else{
                      const passwordHash=bcryptjs.hashSync(password,10)
                      user.from.push(from)    
                      user.password.push(passwordHash)
                      user.verification=true
                      await user.save()
                      res.json({success:true,from:'signup',message:`We add ${from} to your means to sign in`})
                   }
                } 
               else{

                const passwordHash=bcryptjs.hashSync(password,10);

                const newUser= await new User ({
                    name:name,
                    surname:surname,
                    email:email,
                    password:[passwordHash],
                    photoUser:photoUser,
                    country:country,
                    from:[from],
                    uniqueString:uniqueString,
                    verification: verification

                })      
                  if(from!=='form-signup'){
                     newUser.verification=true;
                     await newUser.save()
                     res.json({success:true,from:'signup',message:`Congratulations you have created your user with  ${from}`})
                  } 
                  else{
                     await newUser.save()
                     await sendEmail(email,uniqueString)
                     res.json({success:true,from:'signup',message:'We have sent you an email to validate it, please check your email box'})
                  }    
               }
             }

             catch(err){
               console.log(err)
               res.json({success:false,message:'Something went wrong try again in a few minutes'})
            }
             
           },

           signInUsers: async (req,res)=>{

            const {email,password,from}=req.body.logedUser
           
         
            try{
               const user= await User.findOne({email: email})
               /* const indexPass= user.from.indexOf(from) */

               if(!user){
                  res.json({success:false,from:'no from',message:`${email} has no account, please SIGN UP!`})
               }
               else{
                   if(from!=="form-signup"){
                     let matchPsw= user.password.filter(pass=>bcryptjs.compareSync(password,pass));

                     if(matchPsw.length>0){

                      const userData={
                        id: user._id,
                        name: user.name,
                        surname:user.surname,
                        email:user.email,
                        photoUser: user.photoUser,
                        country: user.country,
                        from:user.from 
                      } 
                      
                     const token= jwt.sign({...userData},process.env.SECRET_KEY,{expiresIn: 60* 60*24}) // un Dia

                      res.json({
                        success:true,
                        from:from,
                        response:{token,userData},
                        message: `Welcome again ${userData.name} ${userData.surname} `
                      })
                         
                     }
                     else{
                        res.json({success:false,from:from,message:`The password or email made with your ${from} register is incorrect`})
                     }
               }
               else{

                  if(user.verification){

                     let matchPsw= user.password.filter(pass=>bcryptjs.compareSync(password,pass));
                
                     if(matchPsw.length > 0){
 
                      const userData={
                        id: user._id,
                        name: user.name,
                        surname:user.surname,
                        email:user.email,
                        photoUser: user.photoUser,
                        country: user.country,
                        from:user.from 
                       } 
                      
                       const token= jwt.sign({...userData},process.env.SECRET_KEY,{expiresIn: 60* 60*24}) // un Dia

                       res.json({
                         success:true,
                         from:from,
                         response:{token,userData},
                         message: `Welcome again ${userData.name} ${userData.surname}`
                       })
                       
                     } 
                      else{
                         res.json({
                            success:false,
                            from:from,
                            message: 'Password or username incorrect'
                          })
                      }

                  } 
                  else{

                     res.json({
                        success:false,
                        from:from,
                        message: "We send you a verification email to your mailbox, please verify it to be able to enter"
                      })

                  }
                 
               }
            }
            
               
            }
            catch(err){res.json({success:false,message:'Something went wrong try again in a few minutes'})}
         },
       
          verifyMail: async (req,res) => {
            const {string}=req.params
            const user= await User.findOne({uniqueString:string})
            
            if(user){
               user.verification=true
               await user.save()
               res.redirect("http://localhost:3000/")
            }
            else{
               res.json({success:false,message:'Email has not been confirmed yet!'})
            }
          },

          verificarToken: async (req,res) => {
                  
                    if(req.user){

                     const userData={
                        id: req.user.id,
                        name: req.user.name,
                        surname:req.user.surname,
                        email:req.user.email,
                        photoUser: req.user.photoUser,
                        country: req.user.country,
                        from:req.user.from 
                       } 
                    res.json({success:true, message:`Welcome again ${req.user.name} ${req.user.surname}`,from:'Tolen',response:{userData}}) 
                       
                    }

                    else{
                      res.json({success:false, message:'Please make your signIn again'})
                    }
          }
            
           
           
}

module.exports= userController;