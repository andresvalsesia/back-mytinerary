const Itinerary=require('../model/itenerary');

//_id es el id que me genera MongoDB
 
    const itineraryControllers= {
            getItinerary: async (req,res)=>{
                let cities;
                let error=null
                try{
                    cities=await Itinerary.find()
                                .populate('country')
                } catch (err) {error=err}
                res.json({
                    response: error ? 'ERROR' : {cities},
                    success: error ? false : true,
                    error: error
                })
    },

            getOneItinerary: async (req,res) => {
                const id=req.params.id;
                let city;
                let error=null;

                try{
                    city= await Itinerary.findOne({_id:id})
                } catch(err) {error=err}

                res.json({
                    response: error ? 'ERROR' : city,
                    success: error ? false : true,
                    error: error
                })
    }, 

           addItinerary: async (req,res)=>{
            const {country,name,nameUser,img,price,duration,hastag,like,activity}=req.body.data
            let citie;
            let error=null

            try{
                city=await new Itinerary({
                    country:country,
                    name:name,
                    nameUser:nameUser,
                    img:img,
                    price:price,
                    duration:duration,
                    hastag:hastag,
                    like:like,
                    activity:activity
                
                }).save()
            } catch (err) {error=err}

            res.json({
                response: error ? 'ERROR' : citie,
                success: error ? false : true,
                error: error
            })
},
           modifyItinerary: async (req, res)=>{
                 const id=req.params.id
                 const itinerary=req.body.data
                 let itinerarydb;
                 let error=null;

                 try{
                    itinerarydb= await Itinerary.findOneAndUpdate({_id:id},itinerary,{new:true});
                 } catch (err) {error=err}

                 res.json({
                    response: error ? 'ERROR' : itinerarydb,
                    success: error ?  false : true,
                    error: error 
                 })
  },
           removeItinerary: async (req, res)=>{
               const id=req.params.id;
               let itinerary;
               let error=null;

               try{
                itinerary= await Itinerary.findOneAndDelete({_id:id});

               } catch (err){error=err}

               res.json({
                response: error ? 'ERROR' : itinerary,
                success: error ? false : true,
                error:error
               })
            },
            

            likeDislike: async (req, res) => {
                const id = req.params.id //LLEGA POR PARAMETRO DESDE AXIOS
                const user = req.user.id //LLEGA POR RESPUESTA DE PASSPORT
        
                await Itinerary.findOne({ _id: id })
        
                    .then((place) => {
                     
                        if (place.like.includes(user)) {
                            Itinerary.findOneAndUpdate({ _id: id }, { $pull: { like: user } }, { new: true })//PULL QUITA, SACA
                                .then((response) => res.json({ success: true, response: response.like }))
                                .catch((error) => console.log(error))
                        } else {
                            Itinerary.findOneAndUpdate({ _id: id }, { $push: { like: user } }, { new: true })//PUSH AGREGA
                                .then((response) => res.json({ success: true, response: response.like }))
                                .catch((error) => console.log(error))
                        }
                    })
                    .catch((error) => res.json({ success: false, response: error }))
            },

            getItinerariesByCity: async (req, res) => {
                const id = req.params.id;
                let error = null;
                let itineraries = [];
                try {
                    itineraries = await Itinerary.find({ country: id })
                        .populate('comments.userID', { photoUser: 1, name: 1, surname: 1 });
                } catch (err) {
                    error = err;
                    console.log(error);
                }
                res.json({
                    response: error ? 'Error requesting itineraries data' : itineraries,
                    success: error ? false : true,
                    error: error
                })
            }


}
module.exports= itineraryControllers;