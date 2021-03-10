/*
* @file easyhtml.jsx
* @author jansora
* @date 2020/2/5
*/

import {useState, useEffect} from 'react';
import {client} from "./index";


export const FetchDir = () => {

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    if (loading) {
      client.get(`file/ls`)
        .then(setData)
        .finally(() => setLoading(false))
    }
  }, [loading, data])



  return [data, setData]
};


