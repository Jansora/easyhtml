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
import VexTable from "../../database/vex";
import GetVex from "../getter/GetVex";

const AutoSetVex = () => {

  const vex = GetVex();
  // const {recentTransIds} = vex;

  // const [recentTransIds, setRecentTransIds] = useState([])

  const { dispatch } = useContext(GlobalStore);

  // console.log("errrr", vex)


  useEffect(() => {
    DBUtils.get(VexTable, "recentTransIds", (recentTransIds) => dispatch({ type: 'vex', payload: {...vex, recentTransIds} }));
  }, [])


  // useEffect(() => {
  //   console.log("sadsdss", recentTransIds)
  //   if (vex.recentTransIds.length > recentTransIds.) {
  //     const payload = {...vex, recentTransIds}
  //     dispatch({ type: 'vex', payload })
  //   }
  //
  // }, [vex])


  return null;
}
export default AutoSetVex;
