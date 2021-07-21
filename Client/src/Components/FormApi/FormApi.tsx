import React from 'react'
import styled from 'styled-components'
import {Form} from './Form/Form'
import {FaArrowLeft} from 'react-icons/fa'
import {
    Link
  } from "react-router-dom";
export const FormApi: React.FC = ()=>{

    return(
        <>
            <FormPageWrapper>
                <ArrowLeftWrapper>
                    <Link to='/'><FaArrowLeft style={{marginLeft: "1em", marginBottom: "1em", color: "#000"}}/></Link>
                </ArrowLeftWrapper>
                <Form />
            </FormPageWrapper>
        </>
    )
}

const FormPageWrapper = styled.div`
width: 100%;
min-height: 100vh;
background-color: #fff;
display: flex;
flex-direction: column;
justify-content: flex-start;
padding-top: 0.8em;

@media (min-width: 425px){
   display: flex;
   justify-content: flex-start;
   align-items: center;
   padding-top: 0.8em;
   
}
@media (min-width: 1024px){
    overflow: hidden;
    padding-top: 0.8em;
   
}

`

const ArrowLeftWrapper = styled.div`
@media (min-width: 425px){
   width:100%;
   max-width: 500px;
}
@media (min-width: 1024px){
   width: 100%;
   
}
`