import React, {useEffect, useState} from 'react';
import {FetchDir} from "../../components/request/easyhtml";
import {Route, Switch, useHistory, useParams} from "react-router-dom";
import { Tree } from 'antd';
import {Aside, Section} from "../../components/styled/frameworks";
import GetBook from "../../components/hooks/getter/GetBook";
import Chapter from "./Chapter";

const { DirectoryTree, TreeNode } = Tree;

const Book = () => {

  // const [dirs] = FetchDir();

  const { chapter } = useParams();

  const book = GetBook()

  const history = useHistory();

  // const [module, setModule] = useState(null)


  // useEffect(() => {
  //
  // }, [module])
  //
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
      history.push(`/${book.fileName}/${node.title}`)
    }

    console.log('Trigger Select', keys, info);



  };


  return <React.Fragment>
    <Aside style={{width: 500}}>
      {
        book.fileName &&
        <DirectoryTree
          // multiple
          // showLine
          // showIcon={true}
          defaultExpandAll
          defaultSelectedKeys={[chapter]}
          onSelect={onSelect}

          treeData={renderTreeData(book.children)}

        />
      }
    </Aside>
    <Section style={{marginLeft: 500, marginRight: 500}} marginRight={false}>
      <Switch>
        <Route path="/:book/:chapter" component={Chapter} exact={false}/>
      </Switch>
    </Section>
  </React.Fragment>
}


export default Book;