
import {ISingleCampaign} from '../../entities/campaigns'
export const POST_CAMPAIGN = 'POST_CAMPAIGN'; 
export const GET_CAMPAIGN = 'GET_CAMPAIGN'; 
export const DELETE_CAMPAIGN = 'DELETE_CAMPAIGN'; 
export const PUT_CAMPAIGN = 'PUT_CAMPAIGN'; 


export interface ICampaignTypes{
    POST_CAMAPIGN:{
        postSinglecampaign: ISingleCampaign[];
    }
    GET_CAMPAIGN:{
        campaigns: ISingleCampaign[];
    }
    DELETE_CAMAPIGN:{
        deleteCampaign: ISingleCampaign[];
    }
    PUT_CAMAPIGN:{
        editCampaign: ISingleCampaign[];
    }
   
}

