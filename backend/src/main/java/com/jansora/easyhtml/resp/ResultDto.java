package com.jansora.easyhtml.resp;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.jansora.easyhtml.exception.BaseException;
import com.jansora.easyhtml.exception.ErrorEnum;
import org.springframework.util.ObjectUtils;

import java.io.Serializable;

/**
 * <Description>Spring Controller Standard Result <br>
 *
 * @author zhang.yangyuan <br>
 * @version 1.0 <br>

 * @see com.jansora <br>
 * @since <br>
 */
public class ResultDto<T> implements Serializable {

    public ResultDto() {

    }

    public boolean isStatus() {
        return this.status;
    }

    public T getData() {
        return this.data;
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

    public void setStatus(boolean status) {
        this.status = status;
    }

    public void setData(T data) {
        this.data = data;
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

    public boolean equals(final Object o) {
        if (o == this) return true;
        if (!(o instanceof ResultDto)) return false;
        final ResultDto<?> other = (ResultDto<?>) o;
        if (!other.canEqual((Object) this)) return false;
        if (this.isStatus() != other.isStatus()) return false;
        final Object this$data = this.getData();
        final Object other$data = other.getData();
        if (this$data == null ? other$data != null : !this$data.equals(other$data)) return false;
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
        return true;
    }

    protected boolean canEqual(final Object other) {
        return other instanceof ResultDto;
    }

    public int hashCode() {
        final int PRIME = 59;
        int result = 1;
        result = result * PRIME + (this.isStatus() ? 79 : 97);
        final Object $data = this.getData();
        result = result * PRIME + ($data == null ? 43 : $data.hashCode());
        final Object $errorCode = this.getErrorCode();
        result = result * PRIME + ($errorCode == null ? 43 : $errorCode.hashCode());
        final Object $errorDesc = this.getErrorDesc();
        result = result * PRIME + ($errorDesc == null ? 43 : $errorDesc.hashCode());
        final Object $errorDetail = this.getErrorDetail();
        result = result * PRIME + ($errorDetail == null ? 43 : $errorDetail.hashCode());
        return result;
    }

    public String toString() {
        return "ResultDto(status=" + this.isStatus() + ", data=" + this.getData() + ", errorCode=" + this.getErrorCode() + ", errorDesc=" + this.getErrorDesc() + ", errorDetail=" + this.getErrorDetail() + ")";
    }

    /*
        default true.
        if error has reached, Assign false and give reason on this.errorCode && this.errorDesc
     */
    private boolean status = true;

    /*
        data should be assigned when status is true;
     */
    @JsonProperty("data")
    private T data = null;

    public enum Status {
        SUCCESS, FAILED
    }

    /*
     errorCode should be assigned when status is false;
     */
    private String errorCode;

    /*
     errorDesc  should be assigned when status is false;
     */
    private String errorDesc;

    /*
     errorDesc  should be assigned when status is false;
     */
    private String errorDetail;




    public ResultDto(Status status, T data, String errorCode, String errorDesc, String errorDetail, BaseException e) {
        this.setStatus(Status.SUCCESS.equals(status));
        this.data = data;
        this.setErrorCode(errorCode);
        this.setErrorDesc(errorDesc);
        this.setErrorDetail(errorDetail);
        if(!ObjectUtils.isEmpty(e)) {
            this.setErrorCode(e.getErrorCode());
            this.setErrorDesc(e.getErrorDesc());
            this.setErrorDetail(e.getErrorDetail());
        }
    }
    /**
     * <Description> 成功的构造函数 <br>
     *
     * @author zhang.yangyuan  2020/11/26 18:17:12 <br>
     * @param data 返回数据
     */
    public ResultDto (T data) {
        this(Status.SUCCESS, data, null, null, null, null);
    }
    /**
     * <Description> 失败 <br>
     *
     * @author zhang.yangyuan  2020/11/26 18:17:12 <br>
     * @param errorCode 错误编码
     * @param errorDesc 错误注释
     */
    public static <T> ResultDto<T> FAIL (String errorCode, String errorDesc, String errorDetail) {
        return new ResultDto<>(Status.FAILED, null, errorCode, errorDesc, errorDetail, null);
    }
    /**
     * <Description> 失败 <br>
     *
     * @author zhang.yangyuan  2020/11/26 18:17:12 <br>
     * @param errorEnum 错误编码
     * @param errorDetail 错误注释
     */
    public static <T> ResultDto<T> FAIL (ErrorEnum errorEnum, String errorDetail) {
        return new ResultDto<>(Status.FAILED, null, errorEnum.getErrorCode(), errorEnum.getErrorDesc(), errorDetail, null);

    }
    /**
     * <Description> 失败 <br>
     *
     * @author zhang.yangyuan  2020/11/26 18:17:12 <br>
     * @param e BaseException
     */
    public ResultDto(BaseException e) {
        this.setStatus(false);
        this.setErrorCode(e.getErrorCode());
        this.setErrorDesc(e.getErrorDesc());
        this.setErrorDetail(e.getErrorDetail());
    }
    public static <T> ResultDto<T> FAIL (BaseException e) {
        return new ResultDto<>(Status.FAILED, null, null, null, null, e);
    }
    /**
     * <Description> 成功的构造函数 <br>
     *
     * @author zhang.yangyuan  2020/11/26 18:17:12 <br>
     */
    public static <T> ResultDto<T> SUCCESS () {
        return new ResultDto<>(Status.SUCCESS, null, null, null, null, null);
    }
    /**
     * <Description> 成功的构造函数 <br>
     *
     * @author zhang.yangyuan  2020/11/26 18:17:12 <br>
     */
    public static <T> ResultDto<T> SUCCESS (T data) {
        return new ResultDto<>(Status.SUCCESS, data, null, null, null, null);
    }


}
