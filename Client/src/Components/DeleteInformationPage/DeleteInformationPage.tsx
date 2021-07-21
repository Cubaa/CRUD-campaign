import React from 'react'
import styled from 'styled-components'
import {TiDelete} from 'react-icons/ti'
import {FaArrowLeft} from 'react-icons/fa'
import {
    Link
  } from "react-router-dom";
export const DeleteInformationPage:React.FC = ()=>{
    return(
        <>
            <ArrowLeftWrapper>
                <Link to='/'><FaArrowLeft style={{marginTop: "1.5em", color: "#000", fontSize: "2em"}}/></Link>
            </ArrowLeftWrapper>
            <div>
                <TiDelete style={{fontSize: "8em", color: "#FF0000"}}/>
                <h1>The campaign has been removed</h1>
            </div>
        </>
    )
}

const ArrowLeftWrapper = styled.div`
@media (min-width: 425px){
   width:100%;
   max-width: 500px;
}
@media (min-width: 1024px){
   width: 100%;
   
}
`