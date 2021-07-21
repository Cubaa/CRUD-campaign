import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import {SearchingTools} from './SearchingTools/SearchingTools'
import {ApiData} from './ApiData/ApiData'
import {useDispatch} from 'react-redux'
import {useSelector} from 'react-redux'
import {IState} from '../../../reducers'
import {IGetCampaignsReducer} from '../../../reducers/getCampaignsReducer'
import {getCampaigns} from '../../../actions/campaignActions'
import {deleteCampaign} from '../../../actions/campaignActions'
import{ISingleCampaign} from '../../../entities/campaigns'


type GetCampaigns = ReturnType<typeof getCampaigns>
type DeleteCampaigns = ReturnType<typeof deleteCampaign>
export const ApiInterface: React.FC = ()=>{
    const [inputSearchCampaignValue, setInputSearchCampaignValue] = useState("")
   

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch<GetCampaigns>(getCampaigns())
     
    }, [])

    const { campaigns } = useSelector<IState, IGetCampaignsReducer >(globalState =>({
        ...globalState.campaigns   
    }))
    

    const searchCampaigneHandler = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setInputSearchCampaignValue(e.target.value)
    }
    const searchCampaigns = campaigns.filter((campaign: ISingleCampaign)=>{
            if(campaign.campaignName.includes(inputSearchCampaignValue.trim()) || campaign.campaignName.toLocaleLowerCase().includes(inputSearchCampaignValue.trim()) || campaign.campaignName.toLocaleUpperCase().includes(inputSearchCampaignValue.trim()))
                    return campaign
        })
  
    const deleteSingleCampaign = (e:any)=>{
        dispatch<DeleteCampaigns>(deleteCampaign(e.target.parentElement.parentElement.dataset.id))
        e.target.parentElement.parentElement.remove()    
    }   
    

    const optionToolData = {searchCampaigneHandler}

    return(
        <>
            <SearchingToolsWrapper>
                <SearchingTools {...optionToolData}/>
            </SearchingToolsWrapper>
            <ApiDataWrapper>
                <ApiData inputSearchCampaignValue={inputSearchCampaignValue} deleteSingleCampaign={deleteSingleCampaign} searchCampaigns={searchCampaigns}/>
            </ApiDataWrapper>
        </>
    )
}

const SearchingToolsWrapper = styled.div`
@media (max-width: 1023px){
    border-bottom: 1px solid #E6E8EC;
}
display: flex;
justify-content: flex-start;
align-items: center;
width:100%;
min-height: 5vh;
background-color: #FFFFFF;
padding: 0.5em;
input{
    margin-left: 0.5em;
    margin-right: 0.7em;
    border: none;
    background-color: #E8EBEF;
    border-radius: 0.2em;
    padding: 0.3em 0.7em;
    outline: none;
    font-size: 1em;
    color: #63676b;
    font-family: 'Nunito Sans', sans-serif;
    &::placeholder{
        color: #8F979F;
        font-size: 0.8em;
        font-family: 'Nunito Sans', sans-serif;
    }
}
div{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 28px;
    background-color: #F3F5F7;
    border-radius: 0.2em;
}

`

const ApiDataWrapper = styled.div`
width: 100%;
min-height: 5vh;

border:none;
display: flex;
@media (min-width: 1023px) {
    margin-top: 1em;
    display: flex;
}
`
