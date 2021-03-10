/*
* @file index.jsx
* @author jansora
* @date 2020/2/16
*/


import React from "react";
import {Aside, Label as CustomLabel, LinkItem} from "../../components/styled/frameworks";
import {Dimmer, Icon, Loader} from "semantic-ui-react";

import {Icons} from "../../components/constants/icons"
import styled from "styled-components";

import {useParams} from "react-router-dom";

const Wrapper = styled.div`
  width: 100%;
  height: calc(100vh - var(--header-height));
  //margin-left: 250px;
  //margin-top: 40px;
  //margin: 0 auto;
  overflow: hidden;
  > i {
    position: fixed;
    cursor: pointer;
    right: 10px;
    top: 60px;
  }
  iframe {
    width: 100%;
    height: 100%;
    overflow:scroll;
  }
`

const IFrameWrapper = (props) => {
  const {loading, src, name} = props;


  return (
      <React.Fragment>
        <Dimmer active={loading} inverted>
          <Loader active inline='centered' />
        </Dimmer>
        <Wrapper >
            <iframe
                title={name}
                src={src}
                allowFullScreen={true}
                frameBorder={0} scrolling="yes"
            />

        </Wrapper>

      </React.Fragment>
  )
}

export default IFrameWrapper;
