
import {Dispatch} from 'redux';
import * as actionTypes from '../actions/actionTypes/campaignTypes'
import {ISingleCampaign} from '../entities/campaigns'


export const postCampaign = (data: ISingleCampaign, emeraldAccount: number): Promise<ISingleCampaign[]> =>((dispatch: Dispatch) =>{
    return fetch(`http://localhost:4000/api/campaign`, {
        method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      
    },
    body: JSON.stringify({data, emeraldAccount})
    })
        .then(res =>res.json())
        .then((postSinglecampaign: ISingleCampaign[])=>{
            dispatch({
                type: actionTypes.POST_CAMPAIGN,
                postSinglecampaign
            })
        })
}) as any;

export const getCampaigns = (): Promise<ISingleCampaign[]> =>((dispatch: Dispatch) =>{
    console.log(dispatch)
    return fetch(`http://localhost:4000/`)
        .then(res =>res.json())
        .then((campaigns: ISingleCampaign[])=>{
            dispatch({
                type: actionTypes.GET_CAMPAIGN,
                campaigns
            })
        })
}) as any;

export const deleteCampaign = (id: string): Promise<ISingleCampaign[]> =>((dispatch: Dispatch) =>{
    return fetch(`http://localhost:4000/api/campaign/${id}`, {
        method: 'DELETE'
         })
        .then(res =>res.json())
        .then((deleteCampaign: ISingleCampaign[])=>{
            dispatch({
                type: actionTypes.DELETE_CAMPAIGN,
                deleteCampaign
            })
        })
}) as any;

export const putCampaign = (id: string, data: ISingleCampaign): Promise<ISingleCampaign[]> =>((dispatch: Dispatch) =>{
    return fetch(`http://localhost:4000/api/campaign/${id}`, {
        method: 'PUT',
        headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      
    },
        body: JSON.stringify({data})
         })
        .then(res =>res.json())
        .then((editCampaign: ISingleCampaign[])=>{
            dispatch({
                type: actionTypes.PUT_CAMPAIGN,
                editCampaign
            })
        })
}) as any;

