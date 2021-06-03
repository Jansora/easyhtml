import React, {useContext, useEffect} from 'react';
import {useTitle} from "ahooks";
import {Route, Switch, useHistory, useParams} from 'react-router-dom';
import {Aside, Head, LinkItem} from "../../components/styled/frameworks";
import {Dropdown} from "semantic-ui-react";
import styled from "styled-components";

import {FetchBooks} from "../../components/request/easyhtml";
import Book from "./Book";
import {GlobalStore} from "../../components/store/global";

/**
 * <Description> <br>
 *
 * @author zhang.yangyuan (jansora)
 2020/12/26 23:30:35
 */
const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  width: 100%;
  //height: 100%;
  z-index: 1;
  h3 {
    margin-right: 20px;
  }
  a {
    margin-right: 10px;
  }
  div.padding {
    flex: 1 1 auto;
  }
`

const EasyHtml = (props) => {

  useTitle("Easy Html")



  const [books] = FetchBooks();

  const { book } = useParams();

  const history = useHistory();


  const { dispatch } = useContext(GlobalStore);

  useEffect(() => {
    console.log("ddaaaaaas", book, books.filter(dir => dir.fileName === book).length !== 0, books.filter(dir => dir.fileName === book))
    if (!!book && books.filter(dir => dir.fileName === book).length !== 0) {
      dispatch({ type: 'book', payload: books.filter(dir => dir.fileName === book)[0]})
    }
  }, [book, books])

  // console.log(data)
  return <React.Fragment>
    <Head>
      <StyledHeader>
        <h3 style={{marginRight: 50}}>
          Easy Html
        </h3>
        {/*{*/}
        {/*  book &&*/}
        {/*  <LinkItem to={`/${book}`} as={NavLink} > <Icon name="connectdevelop" /> {book}  </LinkItem>*/}
        {/*}*/}
        {/*<Divider />*/}

        <div className="padding" />
        <Dropdown
          loading={false}
          onChange={(e, { value }) => history.push(`/${value}`)  }
          options={books.map((dir, index) => {return {key: index, text: dir.fileName, value: dir.fileName}})}
          placeholder='选择'
          search
          defaultValue={book}
          selection
          // value={tag}
          renderLabel={(label) => ({ content: label.text,})}
        />
      </StyledHeader>

    </Head>
    <Aside>
      {
        books.map((item, index) => <LinkItem
          to={`/${item.fileName}`}
          key={item.fileName}
          className={item.fileName === book ? 'active' : ''}
        >
          {/*<Icon name={item.fileName}/>*/}
          {item.fileName}
        </LinkItem>)
      }
    </Aside>
    <Switch>
      {/*<Redirect from="/" to="/:book"  exact={true} />*/}
      {/*<Route path="/:book" component={Book} exact={false}/>*/}
      <Route path="/:book/:chapter" component={Book} exact={false}/>
      <Route path="/:book" component={Book} exact={false}/>
      <Route path="/" component={Book} exact={false}/>
    </Switch>


  </React.Fragment>
}

export default EasyHtml;
