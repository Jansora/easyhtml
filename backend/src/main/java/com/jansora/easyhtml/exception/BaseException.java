package com.jansora.easyhtml.exception;

import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;

/**
 * <Description> <br>
 *
 * @author zhang.yangyuan (jansora)
 * 2020/12/02 15:47:59
 */
public class BaseException extends Exception {

    /*
          errorCode
       */
    protected String errorCode;
    /*
        errorDesc
    */
    protected String errorDesc;
    /*
        errorDetail
     */
    protected String errorDetail;

    /*
        args
     */
    protected Object[] args;

    public BaseException(ErrorEnum errorEnum, Object...args) {
        this.errorCode = errorEnum.errorCode;
        this.errorDesc = errorEnum.errorDesc;
        this.args = args;
    }

    public BaseException(ErrorEnum errorEnum, BaseException e, Object...args) {
        this.errorCode = errorEnum.errorCode;
        this.errorDesc = errorEnum.errorDesc;
        if(ObjectUtils.isEmpty(e)) this.errorDetail = e.getErrorDetail();
        this.args = args;

    }
    public BaseException(String errorCode, String errorDesc, String errorDetail, Object...args) {
        this.errorCode = errorCode;
        this.errorDesc = errorDesc;
        this.errorDetail = errorDetail;
        this.args = args;

    }
    public BaseException(String errorCode, String errorDesc, String errorDetail , BaseException e, Object...args) {
        this.errorCode = errorCode;
        this.errorDesc = errorDesc;
        this.errorDetail = errorDetail;
        this.args = args;

        if(!ObjectUtils.isEmpty(e)) {
            if(StringUtils.hasLength(e.getErrorCode())) this.errorCode = e.getErrorCode();
            if(StringUtils.hasLength(e.getErrorDesc())) this.errorCode = e.getErrorDesc();
            if(StringUtils.hasLength(e.getErrorDetail())) this.errorCode = e.getErrorDetail();
        }
    }
    public BaseException(Object...args) {
        this.args = args;
    }
    public BaseException() {
    }

    public String getErrorCode() {
        return this.errorCode;
    }

    public String getErrorDesc() {
        return this.errorDesc;
    }

    public String getErrorDetail() {
        return this.errorDetail;
    }

    public Object[] getArgs() {
        return this.args;
    }

    public void setErrorCode(String errorCode) {
        this.errorCode = errorCode;
    }

    public void setErrorDesc(String errorDesc) {
        this.errorDesc = errorDesc;
    }

    public void setErrorDetail(String errorDetail) {
        this.errorDetail = errorDetail;
    }

    public void setArgs(Object[] args) {
        this.args = args;
    }

    public String toString() {
        return "BaseException(errorCode=" + this.getErrorCode() + ", errorDesc=" + this.getErrorDesc() + ", errorDetail=" + this.getErrorDetail() + ", args=" + java.util.Arrays.deepToString(this.getArgs()) + ")";
    }

    public boolean equals(final Object o) {
        if (o == this) return true;
        if (!(o instanceof BaseException)) return false;
        final BaseException other = (BaseException) o;
        if (!other.canEqual((Object) this)) return false;
        if (!super.equals(o)) return false;
        final Object this$errorCode = this.getErrorCode();
        final Object other$errorCode = other.getErrorCode();
        if (this$errorCode == null ? other$errorCode != null : !this$errorCode.equals(other$errorCode)) return false;
        final Object this$errorDesc = this.getErrorDesc();
        final Object other$errorDesc = other.getErrorDesc();
        if (this$errorDesc == null ? other$errorDesc != null : !this$errorDesc.equals(other$errorDesc)) return false;
        final Object this$errorDetail = this.getErrorDetail();
        final Object other$errorDetail = other.getErrorDetail();
        if (this$errorDetail == null ? other$errorDetail != null : !this$errorDetail.equals(other$errorDetail))
            return false;
        if (!java.util.Arrays.deepEquals(this.getArgs(), other.getArgs())) return false;
        return true;
    }

    protected boolean canEqual(final Object other) {
        return other instanceof BaseException;
    }

    public int hashCode() {
        final int PRIME = 59;
        int result = super.hashCode();
        final Object $errorCode = this.getErrorCode();
        result = result * PRIME + ($errorCode == null ? 43 : $errorCode.hashCode());
        final Object $errorDesc = this.getErrorDesc();
        result = result * PRIME + ($errorDesc == null ? 43 : $errorDesc.hashCode());
        final Object $errorDetail = this.getErrorDetail();
        result = result * PRIME + ($errorDetail == null ? 43 : $errorDetail.hashCode());
        result = result * PRIME + java.util.Arrays.deepHashCode(this.getArgs());
        return result;
    }
}
