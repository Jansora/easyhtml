import React from 'react';
import MaterialApp from "@jansora/material/es/MaterialApp";
import MaterialLayout from "@jansora/material/es/layout/MaterialLayout";
import MaterialFooter from "@jansora/material/es/layout/footer/MaterialFooter";
import MountGlobal from "@jansora/global/lib/mount";
import StyledLayout from "@jansora/material/es/components/styled/StyledLayout";
import MaterialAside from "@jansora/material/es/layout/aside/MaterialAside";
import Header from "./layout/Header";
import {Route, Routes} from "react-router-dom";
import Book from "./layout/easyhtml/Book";

const App = () => {

  return (
      <MaterialApp>
          <MountGlobal />
          <MaterialLayout>
              <Header />
              <MaterialAside />
              <StyledLayout id="layout">
                  <Routes >
                      {/*<Route path="/play/*" element={<EasyHtml />} />*/}
                      {/*<Route path="/book/*" element={<EasyHtml />} />*/}
                      <Route path=":book/*" element={<Book />} />
                  </Routes>
              </StyledLayout>
              <MaterialFooter/>
          </MaterialLayout>

          {/*<Switch>*/}
          {/*  <Route path="/:book/:chapter" component={EasyHtml} exact={false}/>*/}
          {/*  <Route path="/:book" component={EasyHtml} exact={false}/>*/}
          {/*  <Route path="/" component={EasyHtml} exact={false}/>*/}
          {/*</Switch>*/}

      </MaterialApp>
  );
}

export default App;
