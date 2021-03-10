import React, {useEffect} from 'react';
import {Modal} from "semantic-ui-react";
import {Cat} from "../request/cmd";
import CodeEditor from "../editor/code-editor/CodeEditor";

/**
 * <Description> <br>
 *
 * @author zhang.yangyuan (jansora)
 2021/02/04 23:16:31
 */
const FileView = (props) => {
  const {trigger, filePath} = props
  const [open, setOpen] = React.useState(false)

  const [data, setData] = React.useState({})

  const fileType = ((filePath) => {
    const filePaths =  filePath.split(".");
    // console.log(filePaths, filePaths[filePaths.length -1].length < 10, filePaths[filePaths.length -1])
    if (filePaths.length > 1 && filePaths[filePaths.length -1].length < 10)  {
      return filePaths[filePaths.length -1]
    }
    return "javascript"
  })(filePath)
  useEffect(() => {
    if (open) {
      Cat(filePath, setData)
    }

  }, [open])

  // console.log(fileType)
  return <Modal
      style={{width: "90vw"}}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={trigger}
  >
    <Modal.Header>文件预览: {filePath}</Modal.Header>
    <Modal.Content image>
      {
        data.raw != null &&
        <CodeEditor
            force={false}
            id={filePath}
            language={fileType}
            value={data.raw}
            style={{height: 600}}
        />
      }
    </Modal.Content>
  </Modal>;
}

export default FileView;
