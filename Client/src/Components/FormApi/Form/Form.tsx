import React, {useRef, useState, useEffect} from 'react'
import styled from 'styled-components'
import { Typeahead} from 'react-bootstrap-typeahead';
import {ITownType} from '../../../Types/ITownType'
import {IKeywordType} from '../../../Types/KeywordType'
import Switch from "react-switch";
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'
import {useDispatch} from 'react-redux'
import {useSelector} from 'react-redux'
import {IState} from '../../../reducers'
import {IPostCampaignReducer} from '../../../reducers/postCampaignReducer'
import {postCampaign} from '../../../actions/campaignActions'
import {ISingleCampaign} from '../../../entities/campaigns'
import {IGetEmeraldAccountReducer} from '../../../reducers/getEmeraldAccountReducer'
import {getEmeraldAccount} from '../../../actions/emeraldAccountActions'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type PostCampaign = ReturnType<typeof postCampaign>
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


export const Form: React.FC = ()=>{
    const [keywords, setKeywords] = useState<IKeywordType[]>([])
    const [town, setTwon] = useState<any>([]);
    const [status, setStatus] = useState<boolean>(false)
    const [emeraldMoney, setEmeraldMoney] = useState<number>(0)

    const succesNotify = () => toast("Campaign added!");
    const failureNotify = () => toast('Data incorrectly filled in or 0 was given in the fund!')
    const failuresEmeraldNotify = () => toast('Wrong fund amount')
    

  
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
    const keywordsArray: IKeywordType[] = []
    const dispatch = useDispatch()
    
    useEffect(()=>{
        dispatch<GetEmeraldAccount>(getEmeraldAccount()) 
    }, [])

    const { emeraldAccount } = useSelector<IState, IGetEmeraldAccountReducer >(globalState =>({
        ...globalState.emeraldAccount
        
    }))
    
    
    useEffect(()=>{
        setEmeraldMoney(emeraldAccount)
    }, [emeraldAccount])


    const { postSingleCampaign } = useSelector<IState, IPostCampaignReducer>(globalState =>({
        ...globalState.postSingleCampaign,
       
    }))
   
    
    
    const handleClickSendData = (e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault()
     
        keywords.forEach((keyword:any)=>{
            const keywordValue = keyword.name
            keywordsArray.push(keywordValue)
        })
        const campaignDetails:ISingleCampaign = {
            campaignName: campaignNameInput.current?.value!,
            keywords: keywordsArray,
            bidAmount: parseInt(bidAmountInput.current?.value),
            campaignFund: parseInt(campaignFundInput.current?.value),
            status: status,
            town: town[0]?.name === undefined ? "not completed" : town[0]?.name,
            radius: parseInt(radiusInput.current?.value)
        }
       
        
        if(campaignDetails.campaignName && campaignDetails.keywords.length!==0 && campaignDetails.bidAmount && campaignDetails.campaignFund && campaignDetails.radius){
            if(campaignFundInput.current.value > emeraldMoney || campaignFundInput.current.value<=0){
                keywordsArray.length=0;
                return failuresEmeraldNotify()
            }
                           
            setEmeraldMoney(emeraldMoney - campaignFundInput.current.value)
            dispatch<PostCampaign>(postCampaign(campaignDetails,campaignFundInput.current.value))
            
            succesNotify()
                
        }else{
            keywordsArray.length=0;
            return failureNotify()
        }
    }

    useEffect(() => {
        setValidation((prevState:any)=>{
            return {...prevState, ...postSingleCampaign[2]}
        })
    }, [postSingleCampaign])
  

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
        <FormWrapper>
            <ToastContainer />
            <EmeraldAccountWrapper>Emerald account: <span>{emeraldMoney}</span></EmeraldAccountWrapper>
            <CampaignNameInputWrapper validation = {validation}>        
                <label htmlFor="campaignName">Campaign name</label>
                <input ref={campaignNameInput} type="text" id="campaignName" name="campaignName" placeholder="Campaign name"/>
                <span>Required</span>
            </CampaignNameInputWrapper>   
            <KeywordsTypeaheadWrapper validation = {validation}>
                <label htmlFor="keyword typeahead">Keywords</label>
                    <Typeahead
                        id="keywords typeahead"
                        onChange={setKeywords}
                        labelKey={keywordsList => `${keywordsList.name}`}
                        multiple
                        options={keywordsList}
                        placeholder="Choose a keyword..."
                        ref={keywordsTypeahead}
                    />
                <span>Required</span>
            </KeywordsTypeaheadWrapper>
            <BidAmountInputWrapper validation = {validation}>        
                <label htmlFor="bidAmount">Bid amount</label>
                <input ref={bidAmountInput} type="number" id="bidAmount" name="bidAmount" min="0" placeholder="Min amount"   />
                <span>Required</span>
            </BidAmountInputWrapper>
            <CampaignFundInputWrapper validation = {validation}>        
                <label htmlFor="campaignFund">Campaign fund</label>
                <input ref={campaignFundInput} type="number" id="campaignFund" name="campaignFund" min="0" placeholder="Campaign fund"   />
                <span>Required</span>
            </CampaignFundInputWrapper>
            <StatusWrapper>
                <label>
                    <span>Status</span>
                    <Switch onChange={setStatus} checked={status} onColor="#1A77F4" offColor="#FF5733" width={52} height={22} handleDiameter={20} onHandleColor="#ecf0f5" offHandleColor="#ecf0f5" activeBoxShadow="0 0 0px 0px #fff"/>
                </label>
            </StatusWrapper>
            <TownDropdownListWrapper>
                <label>Towns</label>
                <Typeahead
                    id="towns typeahead"
                    labelKey={townsList => `${townsList.name}`}
                    onChange={setTwon}
                    options={townsList}
                    placeholder="Choose a town..."
                    selected={town}
                />
            </TownDropdownListWrapper>
            <RadiusInputWrapper validation = {validation}>        
                <label>Radius</label>
                <input ref={radiusInput} type="number" id="radius" name="radius" min="0" placeholder="Radius in km"   />
                <span>Required</span>
            </RadiusInputWrapper>
            <FormButtonWrapper>
                <button onClick={(e)=>handleClickSendData(e)}>Add campaign</button>
            </FormButtonWrapper>
        </FormWrapper>
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

const EmeraldAccountWrapper = styled.div`
font-family: 'Nunito Sans', sans-serif;
display: flex;
align-items: center;
justify-content: flex-start;
padding-left: 1em;
padding-bottom: 1em;
padding-top: 0.5em;
span{
    font-weight: 700;
    padding-left: 0.5em;
}
`