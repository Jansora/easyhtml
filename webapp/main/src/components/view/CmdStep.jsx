import React, {useState} from 'react';
import {Container, Grid, Header} from "semantic-ui-react";
import WebsocketUtils from "../hooks/WebsocketUtils";
import {Viewer} from "../editor/bytemd";
import {Timeline} from "antd";
import {CodeViewer} from "../editor/CodeViewer";

/**
 * <Description> <br>
 *
 * @author zhang.yangyuan (jansora)
 2021/02/05 09:54:17
 */
const CmdStep = (props) => {
  //Public API that will echo messages sent to it back to the client

  //Public API that will echo messages sent to it back to the client

  const {payload, onMessageCallback, stageCallback} = props;

  const [message, setMessage] = useState(payload.length > 0 ?
    "------------------------------------\n" + payload[0].description + "\n------------------------------------\n\n" :'')

  const [current, setCurrent] = useState(0)

  const processing = (index) => {
    setCurrent(index)
    console.log(index, payload)

    let msg = message
    if (index < payload.length) {
      msg = msg + "\n------------------------------------\n" + payload[index].description + "\n------------------------------------\n\n"
    }
    else {
      msg = msg + "\n------------------------------------\n" + "流程已结束" + "\n------------------------------------\n\n"
    }
    setMessage(msg)
    stageCallback && stageCallback(index)
  }

  const onMessage = (msg) => {
    setMessage(message + msg.content + "\n")

      setTimeout(() => {
        if ( !!document.querySelector('#StyledCodeWrapper')) {
        document.querySelector('#StyledCodeWrapper').scrollTop = document.querySelector('#StyledCodeWrapper').scrollHeight;
        }
      }, 100)

    onMessageCallback && onMessageCallback(msg)
  }


  return (
      <React.Fragment>

      <WebsocketUtils
          payload={payload}
          stageCallback={processing}
          onMessageCallback={onMessage}
      />



        <Grid columns='equal'>
          <Grid.Column width={12}>

              <CodeViewer
                value={message}
              />

          </Grid.Column>
          <Grid.Column style={{paddingTop: 20}}>
            <Header as="h3"> 当前进度 </Header>

            <Timeline>
              {
                payload.concat([{description: "本流程已结束"}]).map((pay, i) =>
                  <Timeline.Item key={i} color={i < current  ? "green" : (i > current ? "grey" : "blue")}>{pay.description}</Timeline.Item>
                )
              }
            </Timeline>
          </Grid.Column>
        </Grid>
      </React.Fragment>

  );
};

export default CmdStep;
