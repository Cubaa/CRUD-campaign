import express, {Request, Response} from 'express';
import {dataChecking} from '../utilities/dataChecking'
import {campaignsData} from '../index'
import {ISingleCampaign} from '../utilities/utilitiesTypes/campaign'

const campaignesDB = require('../Schema/campaign-api-schema')
const router = express.Router();

let emeraldAccount = 1000000;

router.get('/', async (req: Request, res: Response)=>{
    try{
    const data = await campaignesDB.find({})
    res.json(data)   
    }
    catch(error){
        console.log(error)
    }
})
router.get('/emeraldAccount', (req: Request, res: Response)=>{
    res.json(emeraldAccount)
})

router.get('/api', async (req: Request, res: Response)=>{
    try{
    const data = await campaignesDB.find({})
    res.send(data)
    } catch(error){
        console.log(error);
        
    }
})

router.post('/api/campaign', async (req: Request, res: Response)=>{
    try{
    
    const data:ISingleCampaign = req.body.data
    const actuallAccount = req.body.emeraldAccount
    const validation = await dataChecking([req.body.data])
    
    if(data.campaignFund>emeraldAccount || data.campaignFund<=0) return res.json({msg: "Too large or negative amount of fund", isValid: false})
    else {
        emeraldAccount -= actuallAccount 
    }
    
    if(validation[0]){
        campaignsData.push(data)
        const campaign = new campaignesDB(data)

        campaign.save(campaign)
        .catch((error:any) =>{
            console.log(error)
        })
    }
    res.json(validation);
    }catch(error){
        console.log(error);
    }
})


router.delete('/api/campaign/:id', (req: Request, res: Response)=>{
    const id:string = req.params.id
    
    campaignesDB.findByIdAndDelete(id)
        .then((data: any)=>{
            if(data){
                emeraldAccount+=data.campaignFund
            }
            if(!data) console.log("The data has not been deleted")
        })
    res.json({msg: "The data has been deleted"});
})

router.put('/api/campaign/:id', async(req: Request, res: Response)=>{
    try{
    const id:string = req.params.id
    const data:ISingleCampaign = req.body.data
    const validation = await dataChecking([req.body.data])
    
    if(data.campaignFund>emeraldAccount) return res.json({msg: "Too large amount of fund"})
    if(validation[0]){
        campaignesDB.findByIdAndUpdate(id, data, {useFindAndModify: false})
            .then((editedData: any)=>{
                if(editedData){
                    if(editedData.campaignFund !== data.campaignFund){
                        emeraldAccount=(emeraldAccount + editedData.campaignFund) - data.campaignFund;
                    }
                }
                if(!editedData) console.log({msg: "The data has not been updated"})
            })
    }
    res.json(validation);   
}
catch(error){
    console.log(error);
}
})

module.exports = router;