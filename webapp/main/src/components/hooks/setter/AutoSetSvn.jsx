/*
* @file GetUser.jsx
* @description〈一句话功能简述〉
* @author jansora
* @date 2020-01-16 15:23
*/
import {useContext, useEffect, useState} from 'react';
import {GlobalStore} from "../../store/global";
import SvnTable from "../../database/svn";
import {DBUtils} from "../../database";

const AutoSetSvn = () => {


  const [username, setUsername] = useState(null)

  const [password, setPassword] = useState(null)

  const { dispatch } = useContext(GlobalStore);



  useEffect(() => {
    DBUtils.get(SvnTable, "username", setUsername)
    DBUtils.get(SvnTable, "password", setPassword)
  }, [])


  useEffect(() => {
    if (!!username && !!password) {
      // console.log("auto login", username, password)
      const payload = {username, password}
      dispatch({ type: 'svn', payload })
    }

  }, [username, password, dispatch])

  const { svn } = useContext(GlobalStore);
  return null;
}
export default AutoSetSvn;
