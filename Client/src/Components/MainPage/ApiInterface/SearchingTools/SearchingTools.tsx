import React from 'react'
import {AiOutlinePlus} from 'react-icons/ai'
import {
    BrowserRouter as Router,
    Link
  } from "react-router-dom";


interface IOptionToolData{
    searchCampaigneHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchingTools: React.FC<IOptionToolData> = ({searchCampaigneHandler})=>{
    return(
        <>
            <input onChange={(e)=>searchCampaigneHandler(e)} type="text" placeholder="Search by campaign name"/>
            <div>
                <Link to='/add'>
                    <AiOutlinePlus style={{color: "#1A77F4"}}/>
                </Link>
            </div>
        </>
    )
}