import {IValidationDataTypes} from './utilitiesTypes/validationDataTypes'
import {ISingleCampaign} from './utilitiesTypes/campaign'

export const dataChecking = (data: ISingleCampaign[]):[boolean, string, IValidationDataTypes]=>{
    const campaigneInfo = data[0]

    const errorMsg: IValidationDataTypes={
        isValidCampaignNameInputValue: false,
        isValidKeywordsTypeaheadValue: false,
        isValidBidAmountInputValue: false,
        isValidCampaignFundInputValue: false,
        isValidRadiusInputValue: false
    }
    if(campaigneInfo.campaignName)
        errorMsg.isValidCampaignNameInputValue = true
    else errorMsg.isValidCampaignNameInputValue = false
    if(campaigneInfo.keywords.length===0){
        errorMsg.isValidKeywordsTypeaheadValue = false}
    else errorMsg.isValidKeywordsTypeaheadValue = true
    if(campaigneInfo.bidAmount)
        errorMsg.isValidBidAmountInputValue = true
    else errorMsg.isValidBidAmountInputValue = false
    if(campaigneInfo.campaignFund)
        errorMsg.isValidCampaignFundInputValue = true
    else errorMsg.isValidCampaignFundInputValue = false
    if(campaigneInfo.radius)
        errorMsg.isValidRadiusInputValue = true
    else errorMsg.isValidRadiusInputValue = false

    if(campaigneInfo.campaignName && campaigneInfo.keywords.length && campaigneInfo.bidAmount
        && campaigneInfo.campaignFund && campaigneInfo.radius
        )
        if(campaigneInfo.town) return [true, "Data correct", errorMsg]
        else if(!campaigneInfo.town) return [true, "Data correct", errorMsg]
        else return [true, "Data correct", errorMsg]
    else return [false, "Data correct", errorMsg]
    
}