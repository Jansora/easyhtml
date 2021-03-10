package com.jansora.easyhtml.exception;

/**
 * <Description> <br>
 *
 * @author zhang.yangyuan (jansora)
 * 2020/12/02 23:04:21
 */
public enum ErrorEnum {
    Unknown("500", "未知异常"),
    NotFound("404", "未找到该资源, 请验证后重试"),
    CreateInstanceError("400", "创建对象时出现异常"),
    BeanCopyError("400", "Bean 拷贝时出现异常"),
    RunCmdError("400", "执行命令式出现异常");
    /*
      errorCode
   */
    protected String errorCode;
    /*
        errorDesc
    */
    protected String errorDesc;

    ErrorEnum(String errorCode, String errorDesc) {
        this.errorCode = errorCode;
        this.errorDesc = errorDesc;
    }

    public String getErrorCode() {
        return errorCode;
    }

    public void setErrorCode(String errorCode) {
        this.errorCode = errorCode;
    }

    public String getErrorDesc() {
        return errorDesc;
    }

    public void setErrorDesc(String errorDesc) {
        this.errorDesc = errorDesc;
    }
}
