import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import styled from "styled-components";
import SetDescription from "@jansora/material/es/hooks/setter/SetDescription";


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
    border: none;
    padding: 0 20px;
  }
`

const Chapter = ({chapters}) => {


  const { chapter } = useParams();

  const [current, setCurrent] = useState(null)


  useEffect(() => {
      findNode(chapters, chapter)
  }, [chapter, chapters])

  SetDescription(chapter)

  const findNode = (data, fileName) => {
    if (!data ||  data.length === 0) return undefined;

      const nodes = data.filter(d => d.fileName === fileName);
      if (nodes.length !== 0) {

        setCurrent(nodes[0])
        return ;
      }
      data.map(d => findNode(d.children, fileName))
  }

  return <React.Fragment>


      {
        current && current.filePath &&
          <Wrapper >
              <iframe src={current.filePath} allowFullScreen />

          </Wrapper>
      }

  </React.Fragment>
}


export default Chapter;