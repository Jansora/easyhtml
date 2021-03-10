package com.jansora.easyhtml.resp;


import java.io.Serializable;


public class LogoDto implements Serializable {


    private String title;

    private String logo;


    public LogoDto(String title, String logo) {
        this.title = title;
        this.logo = logo;
    }

    public LogoDto() {
    }

    public String getTitle() {
        return this.title;
    }

    public String getLogo() {
        return this.logo;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setLogo(String logo) {
        this.logo = logo;
    }

    public boolean equals(final Object o) {
        if (o == this) return true;
        if (!(o instanceof LogoDto)) return false;
        final LogoDto other = (LogoDto) o;
        if (!other.canEqual((Object) this)) return false;
        final Object this$title = this.getTitle();
        final Object other$title = other.getTitle();
        if (this$title == null ? other$title != null : !this$title.equals(other$title)) return false;
        final Object this$logo = this.getLogo();
        final Object other$logo = other.getLogo();
        if (this$logo == null ? other$logo != null : !this$logo.equals(other$logo)) return false;
        return true;
    }

    protected boolean canEqual(final Object other) {
        return other instanceof LogoDto;
    }

    public int hashCode() {
        final int PRIME = 59;
        int result = 1;
        final Object $title = this.getTitle();
        result = result * PRIME + ($title == null ? 43 : $title.hashCode());
        final Object $logo = this.getLogo();
        result = result * PRIME + ($logo == null ? 43 : $logo.hashCode());
        return result;
    }

    public String toString() {
        return "LogoDto(title=" + this.getTitle() + ", logo=" + this.getLogo() + ")";
    }
}
