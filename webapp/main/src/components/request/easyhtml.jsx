/*
* @file easyhtml.jsx
* @author jansora
* @date 2020/2/5
*/

import {useState, useEffect} from 'react';
import {client} from "./index";
import {stringify} from 'qs';

export const FetchBooks = () => {

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    if (loading) {
      client.get(`book/ls`)
        .then(setData)
        .finally(() => setLoading(false))
    }
  }, [loading, data])



  return [data, setData]
};


export const FetchChapters = (bookDir) => {

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
  }, [bookDir])

  useEffect(() => {
    if (loading && !!bookDir) {
      client.get(`book/chapters?${stringify({bookDir})}`)
        .then(setData)
        .finally(() => setLoading(false))
    }
  }, [loading, data, bookDir])



  return [data, setData]
};