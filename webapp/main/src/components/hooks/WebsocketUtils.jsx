import React, {useRef, useState} from 'react';
import SockJsClient from 'react-stomp';
import {message as MESSAGE} from "antd";

/**
/**
 * <Description> <br>
 *
 * @author zhang.yangyuan (jansora)
 2021/02/06 17:07:56
 */
const WebsocketUtils = (props) => {

  const messageRef = useRef(null);

  const payload = props.payload || [{send: "/vex/cmd", content: "ls -l", description: "", req: {}}];
  const [currentUser] =  useState( Math.random())
  const address = props.address || "/api/websocket";

  const [index, setIndex] = useState(0)
  const subscribe = (props.subscribe || "/topic/default") + "/" + currentUser;
  const onMessageCallback = props.onMessageCallback || console.log;
  const stageCallback = props.stageCallback || console.log;


  const sendMessage = (index) => {

    const {content, req, send, action} = payload[index]

    const data = {
      from: currentUser,
      content,
      req,
      action,
      targetUser: currentUser,
    }
    if (messageRef && messageRef.current && messageRef.current.sendMessage) {
      messageRef.current.sendMessage(send, JSON.stringify(data));
    }

  }

  const onMessage = (msg) => {

    if (!msg.status) {
      MESSAGE.error(msg.content)
      return
    }

    if (msg.end) {
      const msgIndex = index + 1;
      if (index < payload.length - 1) {

        setTimeout(() => {
          sendMessage(msgIndex)
        }, 1000)


      }
      // MESSAGE.success(`Step ${msgIndex}:` +   msg.content)
      stageCallback && stageCallback(msgIndex)

      setIndex(index + 1)
    }
    else {
      onMessageCallback && onMessageCallback(msg)
    }

  }




  const onConnect = () => {
    sendMessage(index)
  }

  return <SockJsClient url={address} topics={[subscribe]}
                                  onConnect={onConnect}
                                  onMessage={onMessage}
                                  ref={messageRef} />


}

export default WebsocketUtils;
