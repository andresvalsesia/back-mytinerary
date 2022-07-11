const Activity=require('../model/activity');


const activityController={


    getActivity: async (req,res)=>{
        let activitis;
        let error=null
        try{
            activitis=await Activity.find()
                            .populate('country')
        } catch (err) {error=err}
        res.json({
            response: error ? 'ERROR' : {activitis},
            success: error ? false : true,
            error: error
        })
    },

    addMultipleActivity: async (req, res)=>{
        const data=req.body.data
        let error=null;

        try{
            data.map(async(item)=>
              await new Activity({
                  country: item.country,
                  activity: item.activity
               }).save()
            )
        } catch (err) {error=err}
        
        res.json({
               success: error ? false : true,
               error: error
        })

       }  
}

module.exports=activityController;