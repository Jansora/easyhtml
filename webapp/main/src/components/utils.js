
/**
 * <Description> <br>
 *
 * @author zhang.yangyuan (jansora)
 2020/12/17 13:39:33
 */


import 'moment/locale/zh-cn';
import * as moment from 'moment';

moment.locale("zh-CN");

export const IsNumber = s => /^\d+$/.test(s);

export const getFileType = (fileName) => {
  const fileType = fileName.split(".")[fileName.split(".").length - 1]
  switch (fileType) {
    case "svg":
      return "xml";
    case "js":
      return "javascript";
    case "py":
      return "python";
    case "hbs":
      return "html";
    default:
      return fileType;
  }
}


export default moment;



