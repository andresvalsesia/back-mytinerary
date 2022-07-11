const Router= require('express').Router();
const validator=require('../config/validator')


const citiesControllers=require('../controller/citiesControllers');
const itineraryControllers= require('../controller/itnineraryControllers');
const userController=require('../controller/userController');
const activityController=require('../controller/activityControllers');
const passport =require('../config/passport');
const commentControllers=require('../controller/commentControllers');

const {getCities,getOneCity,addCity,modifyCity,removeCity,addMultipleCity}=citiesControllers
const {getItinerary,getOneItinerary,addItinerary,modifyItinerary,removeItinerary,likeDislike,getItinerariesByCity}=itineraryControllers;
const {signUpUsers,signInUsers,verifyMail,verificarToken}=userController;
const {getActivity,addMultipleActivity}=activityController;
const {addComment,modifiComment,deleteComment}=commentControllers;

//Cities
Router.route('/cities')
    .get(getCities)
    .post(addCity)

Router.route('/cities/:id')
    .delete(removeCity)
    .put(modifyCity)
    .get(getOneCity)

Router.route('/cities/:id/itineraries')
        .get(getItinerariesByCity)    
    
Router.route('/addMultipleCity')
    .post(addMultipleCity)  

//Itineraries    
Router.route('/itineraries')  
    .get(getItinerary)
    .post(addItinerary)

Router.route('/itineraries/:id')
     .delete(removeItinerary)
     .put(modifyItinerary)
     .get(getOneItinerary)
     
 //like
 Router.route("/itineraries/like/:id")
    .put(passport.authenticate("jwt", {session: false}),likeDislike)    

//Users
Router.route('/auth/register')
    .post(validator,signUpUsers)

Router.route('/auth/login')
    .post(signInUsers)
 
Router.route('/verify/:string')
    .get(verifyMail) 
    
Router.route('/auth/signInToken')
    .get(passport.authenticate('jwt',{session:false}),verificarToken)
    
    
//activity
Router.route('/addMultipleActivity')
    .post(addMultipleActivity)
Router.route('/activity')
    .get(getActivity)
    
//comments
Router.route('/itineraries/comment')
.post(passport.authenticate('jwt',{ session: false }),addComment)
Router.route('/itineraries/comment/edit')
.put(passport.authenticate('jwt',{ session: false }),modifiComment)

Router.route('/itineraries/comment/:id')
.post(passport.authenticate('jwt',{ session: false }),deleteComment)

module.exports=Router    