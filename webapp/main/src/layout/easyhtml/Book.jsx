import React, {useContext, useState} from 'react';
import {FetchChapters} from "../../components/request/easyhtml";
import {Route, Routes, useNavigate, useParams} from "react-router-dom";
import {Tree} from 'antd';
// import {Section} from "../../components/styled/frameworks";
import styled from "styled-components";
import {GlobalStore} from "@jansora/global/es/store/global";
import Chapter from "./Chapter";

const { DirectoryTree } = Tree;

 const Aside = styled.aside`
  position: fixed;
  top: var(--header-height);
  bottom: var(--footer-height);
  height: calc(100% - var(--header-height) - var(--footer-height));
   
  display: flex;
  flex-direction: column;
  
  background-color: var(--background-color-1);
  padding: 8px 0 8px 16px;
   

`

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
 const Section = styled.section`
   margin-left: 500px;
   padding: 16px 16px 8px 8px;
`

const Book = () => {


  const { book, chapter } = useParams();



  const [chapters] = FetchChapters('/data/geektime/01-专栏课/' + book);


  const navigate = useNavigate();

  const { dispatch } = useContext(GlobalStore);


  const [_chapter, setChapter] = useState(null);


  // useEffect(() => {
  //   dispatch({ type: 'chapter', payload: chapters})
  // }, [chapters])

  const renderTreeData = (data) => {

    return data.map(d => ({
        ...d,
        title: d.fileName,
        key: d.fileName,
        isLeaf: !d.dir,
        children: d.children ? renderTreeData(d.children) : []
      }
    ))

  }
  const onSelect = (keys, info) => {

    const {node} = info

    if (node.isLeaf) {
      setChapter(node)
      navigate(`/${book}/${node.title}`)
    }


  };



  console.log(book, chapters)

  return <React.Fragment>

    <Aside style={{width: 500}} right={false}>
      <div style={{display: "fixed", overflowY: "auto"}}>
        {
            !!chapters && chapters.length !== 0 &&
            <DirectoryTree
                style={{height: "100%"}}

                defaultExpandAll
                defaultSelectedKeys={[chapter]}
                onSelect={onSelect}

                treeData={renderTreeData(chapters)}

            />
        }
      </div>

    </Aside>



    {/*<Aside style={{width: 350}} right={false}>*/}

    {/*</Aside>*/}
    <Section style={{marginLeft: '500px'}} marginRight={true}>
      <Routes>
        <Route path=":chapter" element={<Chapter chapters={chapters} />} />
        {/*<Route path="/:book/:chapter" component={Chapter} exact={false}/>*/}
      </Routes>


    </Section>

  </React.Fragment>
}


export default Book;