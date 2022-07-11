const Citie=require('../model/cities');

//_id es el id que me genera MongoDB
 
    const citiesControllers= {
            getCities: async (req,res)=>{
                let cities;
                let error=null
                try{
                    cities=await Citie.find()
                } catch (err) {error=err}
                res.json({
                    response: error ? 'ERROR' : {cities},
                    success: error ? false : true,
                    error: error
                })
    },

            getOneCity: async (req,res) => {
                const id=req.params.id;
                let city;
                let error=null;

                try{
                    city= await Citie.findOne({_id:id})
                } catch(err) {error=err}

                res.json({
                    response: error ? 'ERROR' : city,
                    success: error ? false : true,
                    error: error
                })
    }, 

           addCity: async (req,res)=>{
            const {country,city,img,description}=req.body.data
            let citie;
            let error=null

            try{
                city=await new Citie({
                    country:country,
                    city:city,
                    img:img,
                    description:description
                }).save()
            } catch (err) {error=err}

            res.json({
                response: error ? 'ERROR' : citie,
                success: error ? false : true,
                error: error
            })
},
           modifyCity: async (req, res)=>{
                 const id=req.params.id
                 const city=req.body.data
                 let citydb;
                 let error=null;

                 try{
                    citydb= await Citie.findOneAndUpdate({_id:id},city,{new:true});
                 } catch (err) {error=err}

                 res.json({
                    response: error ? 'ERROR' : citydb,
                    success: error ?  false : true,
                    error: error 
                 })
  },
           removeCity: async (req, res)=>{
               const id=req.params.id;
               let city;
               let error=null;

               try{
                city= await Citie.findOneAndDelete({_id:id});

               } catch (err){error=err}

               res.json({
                response: error ? 'ERROR' : city,
                success: error ? false : true,
                error:error
               })
            },

            addMultipleCity: async (req, res)=>{
             const data=req.body.data
             let city=[]
             let error=null;

             try{
                 data.map(async(item)=>
                    city.push(await new Citie({
                       country: item.country,
                       city: item.city,
                       img: item.img,
                       description: item.description
                    }).save())
                 )
             } catch (err) {error=err}
             
             res.json({
                    success: error ? false : true,
                    error: error
             })

            }  
            
}
module.exports= citiesControllers;