export interface ISingleCampaign{
    _id?: string;
    campaignName: string;
    keywords: string[];
    bidAmount: number;
    campaignFund: number;
    status: boolean;
    town: string;
    radius: number;
}