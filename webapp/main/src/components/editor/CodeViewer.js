import React, {useRef, useEffect} from 'react';


import styled from "styled-components";



const StyledCodeWrapper = styled.div`
  height: 600px;
  width: 100%;
  background: rgba(0,0,0, 0.03);
  overflow-y: auto;
  white-space: break-spaces;
  padding: 16px;
  line-height: 22px;
`


export const CodeViewer = ({ style, value}) => {
  style = style || {}

  return (
    <StyledCodeWrapper
      style={style}
      id="StyledCodeWrapper"
    >
        {value}
    </StyledCodeWrapper>
  )
}
