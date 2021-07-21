import React, {useState, useRef, useEffect} from 'react'
import styled from 'styled-components';
import { Typeahead} from 'react-bootstrap-typeahead';
import {ITownType} from '../../../Types/ITownType'
import {IKeywordType} from '../../../Types/KeywordType'
import Switch from "react-switch";
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'
import { useParams } from 'react-router';
import {useDispatch} from 'react-redux'
import {useSelector} from 'react-redux'
import {IState} from '../../../reducers'
import {ISingleCampaign} from '../../../entities/campaigns'
import {putCampaign} from '../../../actions/campaignActions'
import { IPutCampaignsReducer } from '../../../reducers/editCampaignReducer';
import {IGetCampaignsReducer} from '../../../reducers/getCampaignsReducer'
import {getCampaigns} from '../../../actions/campaignActions'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {IGetEmeraldAccountReducer} from '../../../reducers/getEmeraldAccountReducer'
import {getEmeraldAccount} from '../../../actions/emeraldAccountActions'


type PutCampaign = ReturnType<typeof putCampaign>
type GetCampaigns = ReturnType<typeof getCampaigns>
type GetEmeraldAccount = ReturnType<typeof getEmeraldAccount>


interface IValidationDataTypes{
    isValidCampaignNameInputValue: boolean;
    isValidKeywordsTypeaheadValue: boolean;
    isValidBidAmountInputValue: boolean;
    isValidCampaignFundInputValue: boolean;
    isValidRadiusInputValue: boolean;
}
interface InputWrapperType  {
    validation: IValidationDataTypes;
}

interface IParams{
    id: string;
}

export const EditCampaigne:React.FC = ()=>{
    
    const {id} = useParams<IParams>()

    const [keywords, setKeywords] = useState<IKeywordType[]>([])
    const [town, setTwon] = useState<any>([]);
    const [status, setStatus] = useState<boolean>(false)
    const [validation, setValidation] = useState<IValidationDataTypes>({
        isValidCampaignNameInputValue: false,
        isValidKeywordsTypeaheadValue: false,
        isValidBidAmountInputValue: false,
        isValidCampaignFundInputValue: false,
        isValidRadiusInputValue: false,
    })
   
    const keywordsTypeahead = React.createRef<Typeahead<any>>();
    let campaignNameInput = useRef<HTMLInputElement>(null)
    let bidAmountInput = useRef<any>(null)
    let campaignFundInput = useRef<any>(null)
    let radiusInput = useRef<any>(null)
    const keyWordsArray: IKeywordType[] = []
    const dispatch = useDispatch()
    
    const succesNotify = () => toast("The selected campaign has been edited!");
    const failureNotify = () => toast('Data incorrectly filled in or 0 was given in the fund!')
    const failuresEmeraldNotify = () => toast('Wrong fund amount')

    useEffect(()=>{
        dispatch<GetCampaigns>(getCampaigns())
        dispatch<GetEmeraldAccount>(getEmeraldAccount())
     
    }, [])

    const { campaigns } = useSelector<IState, IGetCampaignsReducer >(globalState =>({
        ...globalState.campaigns
        
    }))
    const { emeraldAccount } = useSelector<IState, IGetEmeraldAccountReducer >(globalState =>({
        ...globalState.emeraldAccount
        
    }))
   
  
    const editedCampaign = campaigns.filter((campaign: ISingleCampaign) =>{
        if(campaign._id===id)
            return campaign
    })

      

    const handleClickEditData = (e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault()
    
        keywords.forEach((keyword: any)=>{
            const keywordValue = keyword.name
            keyWordsArray.push(keywordValue)
        })
       
        const campaignDetails:ISingleCampaign = {
            campaignName: campaignNameInput.current?.value!,
            keywords: keyWordsArray,
            bidAmount: parseInt(bidAmountInput.current?.value),
            campaignFund: parseInt(campaignFundInput.current?.value),
            status: status,
            town: town[0]?.name === undefined ? "not completed" : town[0]?.name,
            radius: parseInt(radiusInput.current?.value)
        }
      


        if(campaignDetails.campaignName && campaignDetails.keywords.length!==0 && campaignDetails.bidAmount && campaignDetails.campaignFund && campaignDetails.radius){
            if(campaignFundInput.current.value > emeraldAccount || campaignFundInput.current.value<=0) 
                return failuresEmeraldNotify()

                dispatch<PutCampaign>(putCampaign(id, campaignDetails))
                succesNotify()
                  
        }else return failureNotify()

       
    }
    
    const { editCampaign } =  useSelector<IState, IPutCampaignsReducer>(globalState =>({
        ...globalState.editCampaign,
       
    }))


    useEffect(() => {
        setValidation((prevState:any)=>{
            return {...prevState, ...editCampaign[2]}
        })
    }, [editCampaign])

    const keywordsList:IKeywordType[] = [
        { name: 'Social'},
        { name: 'Election'},
        { name: 'Advertising'}
    ]

    const townsList:ITownType[] = [
        { name: 'Warsaw'},
        { name: 'Krakow'},
        { name: 'Poznan'},
        { name: 'Wroclaw'},
        { name: 'Gdansk'},
        { name: 'Katowice'},
        { name: 'Lublin'},
        { name: 'Bialystok'}
    ]

    return(
        <>
            <FormWrapper>
                <ToastContainer/>
            <CampaignNameInputWrapper validation = {validation}>        
                <label htmlFor="campaignName">Campaign name</label>
                <input ref={campaignNameInput} type="text" id="campaignName" name="campaignName" placeholder="Campaign name" defaultValue={editedCampaign[0]?.campaignName}/>
                <span>Required</span>
            </CampaignNameInputWrapper>   
            <KeywordsTypeaheadWrapper validation = {validation}>
                <label htmlFor="keyword typeahead">Keywords</label>
                    <Typeahead
                        id="keyword typeahead"
                        placeholder= "Choose a new typeahead..."
                        onChange={setKeywords}
                        labelKey={keywordsList => `${keywordsList.name}`}
                        multiple
                        options={keywordsList}
                        ref={keywordsTypeahead}
                    />
                     <span>Required</span>
            </KeywordsTypeaheadWrapper>
            <BidAmountInputWrapper validation = {validation}>        
                <label htmlFor="bidAmount">Bid amount</label>
                <input ref={bidAmountInput} type="number" id="bidAmount" name="bidAmount" min="0" placeholder="Min amount" defaultValue={editedCampaign[0]?.bidAmount}/>
                <span>Required</span>
            </BidAmountInputWrapper>
            <CampaignFundInputWrapper validation = {validation}>        
                <label htmlFor="campaignFund">Campaign fund</label>
                <input ref={campaignFundInput} type="number" id="campaignFund" name="campaignFund" min="0" placeholder="Campaign fund" defaultValue={editedCampaign[0]?.campaignFund}/>
                <span>Required</span>
            </CampaignFundInputWrapper>
            <StatusWrapper>
                <label>
                    <span>Status</span>
                <Switch onChange={setStatus} checked={status} onColor="#1A77F4" offColor="#FF5733" width={52} height={22} handleDiameter={20} onHandleColor="#ecf0f5" offHandleColor="#ecf0f5" activeBoxShadow="0 0 0px 0px #fff" />
                </label>
            </StatusWrapper>
            <TownDropdownListWrapper>
                <label>Towns</label>
                <Typeahead
                    id="towns typeahead"
                    labelKey={townsList => `${townsList.name}`}
                    onChange={setTwon}
                    options={townsList}
                    placeholder="Choose a new town..."
                    selected={town}
                />
            </TownDropdownListWrapper>
            <RadiusInputWrapper validation = {validation}>        
                <label>Radius</label>
                <input ref={radiusInput} type="number" id="radius" name="radius" min="0" placeholder="Radius in km"  defaultValue={editedCampaign[0]?.radius}/>
                <span>Required</span>
            </RadiusInputWrapper>
            <FormButtonWrapper>
                <button onClick={(e)=>handleClickEditData(e)}>Edit campaign</button>
            </FormButtonWrapper>
        </FormWrapper>
        </>
    )
}



const FormWrapper = styled.form`
min-height: 20vh;
@media (min-width: 425px){
    width: 100%;
    max-width: 500px;
}
`

const KeywordsTypeaheadWrapper = styled.div<InputWrapperType>`
display: flex;
flex-direction: column;
align-items: flex-start;
justify-content: center;
padding-left: 1em;
    label{
        font-family: 'Nunito Sans', sans-serif;
        margin-bottom: 0.3em;
        font-size: 0.9em;
        font-weight: 700;
        color: #8F979F;
    }
    span{
        display: ${props =>props.validation.isValidKeywordsTypeaheadValue === true ? "none" : "block"};
        color: #FF0000;
        font-size: 0.8em;
    }
    div button span{
        
            display: block;
        
     
    }
   div:nth-of-type(1){
       border: ${props => props.validation.isValidKeywordsTypeaheadValue === true ? "none" : "1px solid #FF0000"};
       border-radius: 0.2em;
       div{
           border:none;  
       }
   }
   
`


const CampaignNameInputWrapper = styled.div<InputWrapperType>`
display: flex;
flex-direction: column;
align-items: flex-start;
justify-content: center;
padding-left: 1em;
margin-bottom: 1em;

label{
        font-family: 'Nunito Sans', sans-serif;
        margin-bottom: 0.3em;
        font-size: 0.9em;
        font-weight: 700;
        color: #8F979F;
    }
input{
    width: 90%;
    background-color: #E8EBEF;
    border-radius: 0.2em;
    padding: 0.3em 0.7em;
    outline: none;
    font-size: 1em;
    color: #63676b;
    font-family: 'Nunito Sans', sans-serif;
    border: ${props => props.validation.isValidCampaignNameInputValue === true ? "none" : "1px solid #FF0000"};
    &::placeholder{
        color: #8F979F;
        font-size: 0.8em;
        font-family: 'Nunito Sans', sans-serif;
    }
    
}
span{
        display: ${props => props.validation.isValidCampaignNameInputValue === true ? "none" : "block"};
        color: #FF0000;
        font-size: 0.8em;
    }
`

const BidAmountInputWrapper = styled.div<InputWrapperType>`
display: flex;
flex-direction: column;
align-items: flex-start;
justify-content: center;
padding-left: 1em;
margin-bottom: 1em;
margin-top: 1em;
label{
        font-family: 'Nunito Sans', sans-serif;
        margin-bottom: 0.3em;
        font-size: 0.9em;
        font-weight: 700;
        color: #8F979F;
    }
input{
    width: 90%;
    background-color: #E8EBEF;
    border-radius: 0.2em;
    padding: 0.3em 0.7em;
    outline: none;
    font-size: 1em;
    color: #63676b;
    font-family: 'Nunito Sans', sans-serif;
    border: ${props => props.validation.isValidBidAmountInputValue === true ? "none" : "1px solid #FF0000"};
    &::placeholder{
        color: #8F979F;
        font-size: 0.8em;
        font-family: 'Nunito Sans', sans-serif;
    }
}
span{
        display: ${props => props.validation.isValidBidAmountInputValue === true ? "none" : "block"};
        color: #FF0000;
        font-size: 0.8em;
    }
`


const CampaignFundInputWrapper = styled.div<InputWrapperType>`
display: flex;
flex-direction: column;
align-items: flex-start;
justify-content: center;
padding-left: 1em;
margin-bottom: 1em;
label{
        font-family: 'Nunito Sans', sans-serif;
        margin-bottom: 0.3em;
        font-size: 0.9em;
        font-weight: 700;
        color: #8F979F;
    }
input{
    width: 90%;
    background-color: #E8EBEF;
    border-radius: 0.2em;
    padding: 0.3em 0.7em;
    outline: none;
    font-size: 1em;
    color: #63676b;
    font-family: 'Nunito Sans', sans-serif;
    border: ${props => props.validation.isValidCampaignFundInputValue === true ? "none" : "1px solid #FF0000"};
    &::placeholder{
        color: #8F979F;
        font-size: 0.8em;
        font-family: 'Nunito Sans', sans-serif;
    }
}
span{
        display: ${props => props.validation.isValidCampaignFundInputValue === true ? "none" : "block"};
        color: #FF0000;
        font-size: 0.8em;
    }
`

const StatusWrapper = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
justify-content: center;
padding-left: 1em;
margin-bottom: 1em;
label{
    display: flex;
    justify-content: center;
}
span{
    align-items: center;
    font-size: 0.9em;
    font-weight: 700;
    color: #8F979F;
    margin-right: 1em;
}

`

const TownDropdownListWrapper = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
justify-content: center;
padding-left: 1em;
    label{
        font-family: 'Nunito Sans', sans-serif;
        margin-bottom: 0.3em;
        font-size: 0.9em;
        font-weight: 700;
        color: #8F979F;
    }
`

const RadiusInputWrapper = styled.div<InputWrapperType>`
display: flex;
flex-direction: column;
align-items: flex-start;
justify-content: center;
padding-left: 1em;
margin-top: 1em;
margin-bottom: 1em;
label{
        font-family: 'Nunito Sans', sans-serif;
        margin-bottom: 0.3em;
        font-size: 0.9em;
        font-weight: 700;
        color: #8F979F;
    }
input{
    width: 90%;
    background-color: #E8EBEF;
    border-radius: 0.2em;
    padding: 0.3em 0.7em;
    outline: none;
    font-size: 1em;
    color: #63676b;
    font-family: 'Nunito Sans', sans-serif;
    border: ${props => props.validation.isValidRadiusInputValue === true ? "none" : "1px solid #FF0000"};
    &::placeholder{
        color: #8F979F;
        font-size: 0.8em;
        font-family: 'Nunito Sans', sans-serif;
    }
}
span{
        display: ${props => props.validation.isValidRadiusInputValue === true ? "none" : "block"};
        color: #FF0000;
        font-size: 0.8em;
    }
`

const FormButtonWrapper = styled.div`
display: flex;
justify-content: center;
margin-top: 2em;
align-items: center;
margin-bottom: 2em;
    button{
        border: 1px solid #9a9fa5;
        border-radius: 0.2em;
        padding: 0.3em 0.4em;
        font-size: 0.8em;
        background-color: #E8EBEF;
        color: #63676b;
        font-family: 'Nunito Sans', sans-serif;
        cursor: pointer;
    }

`