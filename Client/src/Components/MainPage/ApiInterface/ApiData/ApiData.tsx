import React from 'react';
import styled from 'styled-components';
import {Link, useHistory} from 'react-router-dom'
import {ISingleCampaign} from '../../../../entities/campaigns'


interface IInputSearchCampaignValue{
    inputSearchCampaignValue: string;
    deleteSingleCampaign: (e:any) => void;
    searchCampaigns: ISingleCampaign[]
}


export const ApiData: React.FC<IInputSearchCampaignValue> = ({inputSearchCampaignValue, deleteSingleCampaign, searchCampaigns})=>{

const history = useHistory()

const getEditCampaign = (e: any)=>{
        e.preventDefault();
        const id = e.target.parentElement.parentElement.dataset.id
        history.push(`/edit/${id}`)
}

    return(
        <>
        <ApiTitlesWrapper>
            {
            
            searchCampaigns.map((campaign:ISingleCampaign, index:number)=>{
                return(
                <SingleCampaignDataWrapper key={index} data-id={campaign._id} style={index%2===0 ? {backgroundColor: '#e7e4e4'} : {backgroundColor: 'lightgrey'}}>
                <div>
                    <a onClick={(e)=>getEditCampaign(e)}>Edit</a>
                    <Link to="/deleteSuccess/" onClick = {(e)=>deleteSingleCampaign(e)}>Delete</Link>
                </div>
                <div>
                    <span>Campaign Name</span>
                    <span>{campaign.campaignName}</span>
                </div>
                <div>
                    <span>Keywords</span>
                    <span>
                        {campaign.keywords.map((keyword: any)=>{
                            return(
                            <span>{keyword} </span>
                            )
                        })}
                    </span>
                </div>
                <div>
                    <span>Bid amount</span>
                    <span>{campaign.bidAmount}</span>
                </div>
                <div>
                    <span>Campaign fund</span>
                    <span>{campaign.campaignFund}</span>
                </div>
                <div>
                    <span>Status</span>
                    <span>{campaign.status}</span>
                </div>
                <div>
                    <span>Town</span>
                    <span>{campaign.town}</span>
                </div>
                <div>
                    <span>Radius</span>
                    <span>{campaign.radius}</span>
                </div>
                </SingleCampaignDataWrapper>
                )
            })}
        </ApiTitlesWrapper>
        </>
    )
}

const ApiTitlesWrapper = styled.div`
display: flex;
flex-direction: column;
width:100%;

@media (max-width: 1023px){
display: flex;
flex-direction: column;
width:100%;
margin-top: 1em;

div:nth-of-type(8){
border: none;
}
}
`

const SingleCampaignDataWrapper = styled.div`
@media (min-width: 1024px){
display: flex;
flex-direction: row;
margin-bottom: 1em;
border: 1px solid black;
border-radius: 0.2em;   
div{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-right: 1px solid #000;
    color: #444444;
    font-family: 'Nunito Sans', sans-serif;
    width: 100%; 
    padding:0.3em 0 0.3em 0;
        span:nth-of-type(1){
            font-size: 1em;
            font-weight: 700;
        }
        span:nth-of-type(2){
            font-size: 1em;
            padding-top: 0.8em;
        }
    }

    div:nth-of-type(3) span:nth-of-type(2) span{
    font-size: 0.8em;
    padding-left: 0.3em;
    &:nth-of-type(1){
        font-weight: 300;
    }
}
    div:nth-of-type(8){
        border-right: none;
}
    >div:nth-of-type(1){
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100%;
        padding: 0 0.8em 0 0.8em;
      a{
          cursor: pointer;
          text-align:center;
          border:0.1em solid grey;
          width: 100%;
          background-color: #fff;
          text-decoration: none;
          color: #000;
          font-size: 0.9em;
      }
      a:nth-of-type(1){
          margin-bottom: 0.2em;  
      }
}
div:nth-of-type(1){
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30%;
}
div:nth-of-type(6){
    width: 40%;
}

}
@media (max-width: 1023px){
display: flex;
flex-direction: column;
margin-bottom: 1em;
border: 1px solid black;
border-radius: 0.2em;   
div{
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom: 1px solid #000;
        flex-direction: column;     
        color: #444444;
        font-family: 'Nunito Sans', sans-serif;
        width: 100%; 
        padding:0.3em 0 0.3em 0;
        span:nth-of-type(1){
            font-size: 1.2em;
        }
        span:nth-of-type(2){
            font-size: 1.2em;
            padding-top: 0.8em;
        }
    }

    div:nth-of-type(3) span:nth-of-type(2) span{
    font-size: 1em;

}

>div:nth-of-type(1){
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100%;
        padding: 0.8em 0.8em 0.8em 0.8em;
      a{
          cursor: pointer;
          text-align:center;
          border:0.1em solid grey;
          width: 100%;
          background-color: #fff;
          text-decoration: none;
          color: #000;
          font-size: 0.9em;
      }
      a:nth-of-type(1){
          margin-bottom: 0.2em;  
      }
    }
}
`