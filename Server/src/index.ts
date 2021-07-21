import express from 'express';
require("dotenv").config({path: "../config.env"})
import cors from 'cors';
import './database/database';
import {ISingleCampaign} from './utilities/utilitiesTypes/campaign'
const campaignApi = require('./routes/campaignApi');



const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.use('/', campaignApi);


const server = app.listen(4000, ()=>{
    console.log("Server is listening!");
});

export const campaignsData:ISingleCampaign[] = []

export default app;