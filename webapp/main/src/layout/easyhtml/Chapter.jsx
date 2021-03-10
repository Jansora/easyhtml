import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Tree} from 'antd';
import {Section} from "../../components/styled/frameworks";
import GetBook from "../../components/hooks/getter/GetBook";
import {GlobalStore} from "../../components/store/global";
import GetChapter from "../../components/hooks/getter/GetChapter";
import IFrameWrapper from "../../components/view/IFrameWrapper";
import styled from "styled-components";

const { DirectoryTree, TreeNode } = Tree;

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

const Chapter = () => {


  const { chapter } = useParams();

  const { dispatch } = useContext(GlobalStore);

  const chapters = GetChapter()

  const [current, setCurrent] = useState(null)


  useEffect(() => {
    findNode(chapters, chapter)
  }, [chapters, chapter])


  const findNode = (data, fileName) => {
    if (!data ||  data.length === 0) return undefined;

    // console.log("data", data)
      const nodes = data.filter(d => d.fileName === fileName);
      if (nodes.length !== 0) {
        // dispatch({ type: 'chapter', payload: nodes[0]})
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