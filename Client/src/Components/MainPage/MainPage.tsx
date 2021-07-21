import React from 'react';
import styled from 'styled-components';
import {ApiInterface} from './ApiInterface/ApiInterface'


export const MainPage: React.FC = ()=>{
    return(
        <>
            <ApiInterfaceWrapper>
                <ApiInterface />
            </ApiInterfaceWrapper>
        </>
    )
}

const ApiInterfaceWrapper = styled.div`
width: 95%;
height: 95vh;
background-color: #fff;
box-sizing: border-box;

@media (max-width: 1023px) {
width: 100%;
height: 100vh;
background-color: #fff;
box-sizing: border-box;
}
`