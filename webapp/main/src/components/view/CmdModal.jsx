import React, {useEffect, useState} from 'react';
import {Grid, Modal} from "semantic-ui-react";
import WebsocketUtils from "../hooks/WebsocketUtils";
import {Viewer} from "../editor/bytemd";
import {CodeViewer} from "../editor/CodeViewer";
import CmdStep from "./CmdStep";

/**
 * <Description> <br>
 *
 * @author zhang.yangyuan (jansora)
 2021/02/05 09:54:17
 */
const CmdModal = (props) => {
  //Public API that will echo messages sent to it back to the client

  //Public API that will echo messages sent to it back to the client

  const {trigger} = props;
  const [open, setOpen] = React.useState(false)

  const header = props.header || "默认标题";

  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!open) {
      setMessage('')
    }
  }, [open])

  // const renderContent = () => {
  //   // console.log(props.payload)
  //   if (props.payload && props.payload.length === 1 && props.payload[0].send === '/vex/cmd') {
  //     return '```\n' + props.payload[0].action + '\n```\n## \n ```\n' + message + '```\n';
  //   }
  //   return '```\n' + message + '\n```'
  // }

  console.log("CMMModal", props)
  return (
      <React.Fragment>


        <Modal
            style={{width: "90vw"}}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={trigger}
        >
          <Modal.Header>{header}</Modal.Header>
          <Modal.Content>
            <Grid>
              <Grid.Column>
                <CmdStep
                  payload={props.payload}
                  onMessageCallback={msg => setMessage(message + msg.content + "\n" )}
                  // stageCallback={processing}
                />
                {/*<CodeViewer*/}
                {/*  style={{height: 600}}*/}
                {/*  value={message}*/}
                {/*/>*/}
              </Grid.Column>
            </Grid>



          </Modal.Content>
        </Modal>
      </React.Fragment>

  );
};

export default CmdModal;
