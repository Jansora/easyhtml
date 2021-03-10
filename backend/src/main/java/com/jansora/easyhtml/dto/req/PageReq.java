package com.jansora.easyhtml.dto.req;

import java.io.Serializable;

/**
 * <Description> <br>
 *
 * @author zhang.yangyuan <br>
 * @since <br>
 */
public class PageReq implements Serializable {

    /**
     * 每页大小 <br>
     */
    protected int limit;

    /**
     * 当前页数, 从 0 开始 <br>
     */
    protected int offset;

    /**
     * 总数 <br>
     */
    protected long total;


    /**
     * 排序方式 ASC / DESC <br>
     */
    protected String sort;

    /**
     * 排序字段 <br>
     */
    protected String orderBy;

    public PageReq() {
    }

    public int getLimit() {
        return this.limit;
    }

    public int getOffset() {
        return this.offset;
    }

    public long getTotal() {
        return this.total;
    }

    public String getSort() {
        return this.sort;
    }

    public String getOrderBy() {
        return this.orderBy;
    }

    public void setLimit(int limit) {
        this.limit = limit;
    }

    public void setOffset(int offset) {
        this.offset = offset;
    }

    public void setTotal(long total) {
        this.total = total;
    }

    public void setSort(String sort) {
        this.sort = sort;
    }

    public void setOrderBy(String orderBy) {
        this.orderBy = orderBy;
    }

    public boolean equals(final Object o) {
        if (o == this) return true;
        if (!(o instanceof PageReq)) return false;
        final PageReq other = (PageReq) o;
        if (!other.canEqual((Object) this)) return false;
        if (this.getLimit() != other.getLimit()) return false;
        if (this.getOffset() != other.getOffset()) return false;
        if (this.getTotal() != other.getTotal()) return false;
        final Object this$sort = this.getSort();
        final Object other$sort = other.getSort();
        if (this$sort == null ? other$sort != null : !this$sort.equals(other$sort)) return false;
        final Object this$orderBy = this.getOrderBy();
        final Object other$orderBy = other.getOrderBy();
        if (this$orderBy == null ? other$orderBy != null : !this$orderBy.equals(other$orderBy)) return false;
        return true;
    }

    protected boolean canEqual(final Object other) {
        return other instanceof PageReq;
    }

    public int hashCode() {
        final int PRIME = 59;
        int result = 1;
        result = result * PRIME + this.getLimit();
        result = result * PRIME + this.getOffset();
        final long $total = this.getTotal();
        result = result * PRIME + (int) ($total >>> 32 ^ $total);
        final Object $sort = this.getSort();
        result = result * PRIME + ($sort == null ? 43 : $sort.hashCode());
        final Object $orderBy = this.getOrderBy();
        result = result * PRIME + ($orderBy == null ? 43 : $orderBy.hashCode());
        return result;
    }

    public String toString() {
        return "PageReq(limit=" + this.getLimit() + ", offset=" + this.getOffset() + ", total=" + this.getTotal() + ", sort=" + this.getSort() + ", orderBy=" + this.getOrderBy() + ")";
    }

    /**
     * <Description> 校验是否启用分页且分页参数真实有效 <br>
     *
     * @author zhang.yangyuan <br>
     * @since <br>
     */
//    public boolean enablePageProperties() {
//        return this.pageNum > 0 && this.pageSize > 0;
//    }

}
