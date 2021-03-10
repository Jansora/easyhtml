package com.jansora.easyhtml.resp;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.jansora.easyhtml.dto.req.PageReq;

import java.util.List;

/**
 * <Description> <br>
 *
 * @author zhang.yangyuan <br>
 * @version 1.0 <br>

 * @since <br>
 */
public class PageDto<T> extends PageReq {

    /**
     * 总数 <br>
     */
    @JsonProperty("data")
    private List<T> data;

    public PageDto() {
    }


    public static <T>  PageDto<T> build(List<T> data, long total) {
        PageDto<T> pageDto = new PageDto<>();
        pageDto.setData(data);
        pageDto.setTotal(total);
        return pageDto;
    }

    public List<T> getData() {
        return this.data;
    }

    public void setData(List<T> data) {
        this.data = data;
    }

    public String toString() {
        return "PageDto(data=" + this.getData() + ")";
    }

    public boolean equals(final Object o) {
        if (o == this) return true;
        if (!(o instanceof PageDto)) return false;
        final PageDto<?> other = (PageDto<?>) o;
        if (!other.canEqual((Object) this)) return false;
        if (!super.equals(o)) return false;
        final Object this$data = this.getData();
        final Object other$data = other.getData();
        if (this$data == null ? other$data != null : !this$data.equals(other$data)) return false;
        return true;
    }

    protected boolean canEqual(final Object other) {
        return other instanceof PageDto;
    }

    public int hashCode() {
        final int PRIME = 59;
        int result = super.hashCode();
        final Object $data = this.getData();
        result = result * PRIME + ($data == null ? 43 : $data.hashCode());
        return result;
    }
}
