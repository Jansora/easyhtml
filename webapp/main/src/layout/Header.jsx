import React, {useContext} from 'react';
import StyledHeader from "@jansora/material/es/components/styled/StyledHeader";
import {Divider, Dropdown, Popover, Space} from 'antd';

import StyledDescription from "@jansora/material/es/components/styled/base/StyledDescription";
import FlexPadding from "@jansora/material/es/components/styled/base/FlexPadding";
import StyledIconFont from "@jansora/material/es/components/styled/StyledIconFont";
import StyledA from "@jansora/material/es/components/styled/StyledA";
// import User from "@jansora/material/es/../view/user";
import GetTitle from "@jansora/material/es/hooks/getter/GetTitle";
import GetDescription from "@jansora/material/es/hooks/getter/GetDescription";
import {GithubOutlined} from "@ant-design/icons";
// import Theme from "./Theme";
import {useResponsive} from "ahooks";
import {Link, useNavigate, useParams} from "react-router-dom";
import GetDarkMode from "@jansora/material/es/hooks/getter/GetDarkMode";

import {Header as HeaderA, Icon} from "semantic-ui-react";
import {FetchBooks} from "../components/request/easyhtml";
import {GlobalStore} from "@jansora/global/es/store/global";


/**
 * <Description> Description for index <br>
 *
 * @author jansora <br>
 * @github https://github.com/Jansora
 * @version 1.0 <br>
 * @CreateDate 2021/11/29 13:03:45 <br>
 * @since 1.0 <br>
 */


const Header = () => {

    const responsive = useResponsive();
    const title = GetTitle();
    const description = GetDescription();


    const [books] = FetchBooks();

    const { book } = useParams();

    const navigate = useNavigate();


    const { dispatch } = useContext(GlobalStore);

    // useEffect(() => {
    //     if (!!book && books.filter(dir => dir.fileName === book).length !== 0) {
    //         dispatch({ type: 'book', payload: books.filter(dir => dir.fileName === book)[0]})
    //     }
    // }, [book, books])


    return <StyledHeader>

    <Link to="/" style={{margin: 0}}>
      <img style={{height: 35, marginRight: 0, marginTop: 0}} src={`https://cdn.jansora.com/logo/${GetDarkMode() ? 'black' : 'main'}.png`}  alt="logo" />
    </Link>

    <Icon style={{margin: "0 10px 5px 10px"}} name="triangle right" inverted={GetDarkMode()} />

    {/*<Divider type="vertical" style={{margin: "0 10px"}}/>*/}
    <HeaderA as="h3" inverted={GetDarkMode()}
             style={{marginTop: 15}}
    >

    <HeaderA.Subheader>
      {title ? title : 'Default'}
    </HeaderA.Subheader>
    </HeaderA>

    <Icon style={{margin: "0 10px 5px 10px"}} name="triangle right" inverted={GetDarkMode()} />

    {/*<Divider type="vertical" style={{margin: "0 10px"}}/>*/}
    <StyledDescription>{description ? description : 'Default'}</StyledDescription>



    <FlexPadding />
    <Space >
      {
        responsive.middle && <>
            <Popover
                trigger='hover'
                content={<img style={{width: 125}} src="https://cdn.jansora.com/homepage/wechat.jpg"  alt="weixin" />}
            >
              <StyledIconFont type="icon-weixin"  />
            </Popover>
            <Divider type="vertical"/>
            <StyledA href={"https://github.com/Jansora/app"}>
              <GithubOutlined style={{fontSize: 16}} />

            </StyledA>

            <Divider type="vertical"/>
              <Dropdown
                  menu={
                  {
                      items: books.map((dir, index) => {
                              return {key: index, label:<Link to={`/${dir.fileName}`} >{dir.fileName}</Link>}
                          })
                  }}
              >
                  <span>图书列表</span>
              </Dropdown>
          </>
      }

      {/*<User />*/}
    </Space>

  </StyledHeader>;
}

export default Header;