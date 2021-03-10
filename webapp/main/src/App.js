import React from 'react';
import styled from "styled-components";
import Hooks from "./components/hooks";
import {configResponsive} from 'ahooks';
import EasyHtml from "./layout/easyhtml";
import {Route, Switch} from "react-router-dom";
import Book from "./layout/easyhtml/Book";

configResponsive({
  small: 0,
  middle: 800,
  large: 1200,
});



const LayoutWrapper = styled.main`
  padding-top: var(--header-height);
  height: 100%;

   ;
  transition:  margin-left 500ms;

  > header {
    z-index: 1;
    width: 100vw;
    transition: width 500ms;
  }
`;


const App = () => {

  return (
      <React.Fragment>
        <LayoutWrapper >

          <Hooks />

          <Switch>
            <Route path="/:book/:chapter" component={EasyHtml} exact={false}/>
            <Route path="/:book" component={EasyHtml} exact={false}/>
            <Route path="/" component={EasyHtml} exact={false}/>
          </Switch>
        </LayoutWrapper>
      </React.Fragment>
  );
}

export default App;
