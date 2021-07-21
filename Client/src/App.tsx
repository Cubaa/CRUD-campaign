import React from 'react';
import styled from 'styled-components'
import {Provider} from 'react-redux'
import store from './store/store'
import {MainPage} from './Components/MainPage/MainPage'
import {EditCampaigneApi} from './Components/EditCampaigneApi/EditCampaigneApi'
import {DeleteInformationPage} from './Components/DeleteInformationPage/DeleteInformationPage'
import {FormApi} from './Components/FormApi/FormApi'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


function App() {
  return (
    <Router>
      <Provider store={store}>
      <div>
      <Switch>
          <Route exact path="/">
            <MainPageWrapper>
              <MainPage />
            </MainPageWrapper>
          </Route>
          <Route path="/add">
            <FormApiWrapper>
              <FormApi />
            </FormApiWrapper>
            </Route>
            <Route path="/edit/:id">
              <EditCampaignWrapper>
                <EditCampaigneApi />
              </EditCampaignWrapper>
            </Route>
          <Route path="/deleteSuccess">
            <DeleteInformationPageWrapper>
              <DeleteInformationPage />
            </DeleteInformationPageWrapper>
          </Route>
         
      </Switch>
      </div>
      </Provider>
    </Router>
  );
}

export default App;

const MainPageWrapper = styled.section`
display: flex;
justify-content: center;
align-items: center;
width:100%;
height: 100vh;
background-color: #FFF;
`

const FormApiWrapper = styled.section`
display: flex;
justify-content: center;
align-items: center;
width:100%;
min-height: 100vh;
background-color: #fff;
`

const DeleteInformationPageWrapper = styled.section`
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
width:100%;
height: 100vh;
background-color: #fff;
>div{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 7em;
 
}
@media (max-width: 460px){
h1{
    text-align: center;
  }
}
`

const EditCampaignWrapper = styled.section`
display: flex;
justify-content: center;
align-items: center;
width:100%;
min-height: 100vh;
background-color: #fff;

`