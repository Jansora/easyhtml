import React, {useEffect, useState} from 'react';
import DiffEditor from "../../editor/code-editor/DiffEditor";
import {getFileType} from "../../utils";
import {FetchDiff} from "../../request/easyhtml";
import {Modal, Button, Header} from "semantic-ui-react";
import CodeEditor from "../../editor/code-editor/CodeEditor";
import GetTheme from "../../hooks/getter/GetTheme";

/**
 * <Description> <br>
 *
 * @author zhang.yangyuan (jansora)
 2021/02/07 09:09:11
 */
const VexDiff = (props) => {
  const {transId, defaultSource, defaultOrigin, filePath, trigger} = props;
  const theme = GetTheme();
  const header = props.header || "默认标题";

  const [open, setOpen] = React.useState(false)

  const [source, setSource] = useState(defaultSource || "dev");
  const [origin, setOrigin] = useState(defaultOrigin || "process");

  const [data, setData] = useState(["", ""]);


  const toggle = () => {
    // setData(null);
    FetchDiff(transId, source, origin, filePath, setData)
  }

  useEffect(() => {
    if (open) {
      toggle()
    }

  },[open, transId, source, origin, filePath])


  return <React.Fragment>

    <Modal
        style={{width: "90vw"}}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={trigger}
    >
      <Modal.Header>
        {header}

        <Button style={{marginLeft: 20}} floated={"right"} color={theme} basic={!(source === "process" && origin === "prod")}
                onClick={() => {setSource("process"); setOrigin("prod")}} >受控库 vs 过程库  </Button>

        <Button style={{marginLeft: 20}} floated={"right"} color={theme} basic={!(source === "dev" && origin === "prod")}
                onClick={() => {setSource("dev"); setOrigin("prod")}} >受控库 vs 开发库  </Button>


        <Button style={{marginLeft: 20}}
                floated={"right"} color={theme} basic={!(source === "dev" && origin === "process")}
                onClick={() => {setSource("dev"); setOrigin("process")}} >
            过程库 vs 开发库 </Button>




      </Modal.Header>
      <Modal.Content>

        <Header as="h5" />

        <Button.Group>

        </Button.Group>



        {
          data &&  <DiffEditor
              original={{data: data[1], language: getFileType(filePath)}}
              modified={{data: data[0], language: getFileType(filePath)}}
          />
        }
      </Modal.Content>
    </Modal>
  </React.Fragment>;
}

export default VexDiff;
