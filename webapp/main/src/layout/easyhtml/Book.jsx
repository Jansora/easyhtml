import React, {useContext, useEffect} from 'react';
import {FetchChapters} from "../../components/request/easyhtml";
import {Route, Switch, useHistory, useParams} from "react-router-dom";
import {Tree} from 'antd';
import {Section} from "../../components/styled/frameworks";
import GetBook from "../../components/hooks/getter/GetBook";
import Chapter from "./Chapter";
import {GlobalStore} from "../../components/store/global";
import styled from "styled-components";

const { DirectoryTree, TreeNode } = Tree;

 const Aside = styled.aside`
  //width: var(--aside-width);
  width: ${props => props.Display === false ? "0" : "var(--aside-width)"};;
  display: ${props => props.Display === false ? "none" : "flex"};
  min-height: calc(100% - var(--header-height));
  position: fixed;
  padding: 8px 16px;
  box-shadow: 0 0 8px 0 rgba(0,0,0,.1);
  right: ${props => props.right === true ? "0" : "flex"};
  overflow: scroll;
  //display: flex;
  flex-direction: column;
`

const Book = () => {



  const { book, chapter } = useParams();






  const Book = GetBook()




  const [chapters] = FetchChapters(Book.filePath);


  const history = useHistory();

  const { dispatch } = useContext(GlobalStore);



  useEffect(() => {
    dispatch({ type: 'chapter', payload: chapters})
  }, [chapters])

  //
  // useEffect(() => {
  //   findNode(chapters, chapter)
  // }, [chapters, chapter])
  //
  //
  // const findNode = (data, fileName) => {
  //   if (!data ||  data.length === 0) return undefined;
  //
  //   // console.log("data", data)
  //   const nodes = data.filter(d => d.fileName === fileName);
  //   if (nodes.length !== 0) {
  //     dispatch({ type: 'chapter', payload: nodes[0]})
  //     // setCurrent(nodes[0])
  //     return ;
  //   }
  //   data.map(d => findNode(d.children, fileName))
  // }


  // useEffect(() => {
  //
  //   console.log(book, dirs, dirs.filter(dir => dir.fileName === book).length !== 0)
  //   if(!book) {
  //     return ;
  //   }
  //
  //   if (dirs.filter(dir => dir.fileName === book).length !== 0) {
  //     setModule(dirs.filter(dir => dir.fileName === book)[0])
  //     console.log(dirs.filter(dir => dir.fileName === book)[0], "module")
  //   }
  //
  // }, [book, dirs])

  // useEffect(() => {
  //
  //   if (Book.fileName === book && !!Book.children) {
  //     return ;
  //   }
  //
  //   if (!!book && dirs.filter(dir => dir.fileName === book).length !== 0) {
  //     dispatch({ type: 'book', payload: dirs.filter(dir => dir.fileName === book)[0]})
  //   }
  // }, [book, dirs, Book])


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
      history.push(`/${Book.fileName}/${node.title}`)
    }


  };

  console.log(book, chapters, renderTreeData(chapters))
  return <React.Fragment>

    <Aside style={{width: 350}} right={true}>
      {
        !!chapters && chapters.length !== 0 &&
        <DirectoryTree
          // multiple
          // showLine
          // showIcon={true}

          style={{height: "100%"}}

          defaultExpandAll
          defaultSelectedKeys={[chapter]}
          onSelect={onSelect}

          treeData={renderTreeData(chapters)}

        />
      }
    </Aside>
    <Section style={{marginLeft: '250px', marginRight: '350px'}} marginRight={true}>
      <Switch>
        <Route path="/:book/:chapter" component={Chapter} exact={false}/>
      </Switch>
    </Section>
  </React.Fragment>
}


export default Book;