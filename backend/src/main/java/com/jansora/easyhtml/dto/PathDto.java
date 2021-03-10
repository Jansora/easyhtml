package com.jansora.easyhtml.dto;

import org.springframework.beans.factory.annotation.Value;

import java.io.Serializable;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;

public class PathDto implements Serializable, Comparable<PathDto> {



    String fileName;
    String filePath;
    boolean isDir;

    List<PathDto> children = new ArrayList<>();




    public PathDto(String fileName, String filePath, boolean isDir) {
        this.fileName = fileName;
        this.filePath = filePath;
        this.isDir = isDir;
    }
//    public PathDto(Path path) {
//        this.fileName = path.getFileName().toString();
//        this.filePath = path.toString();
//        this.isDir = path.toFile().isDirectory();
//    }

    public List<PathDto> getChildren() {
        return children;
    }

    public void setChildren(List<PathDto> children) {
        this.children = children;
    }

    public boolean isDir() {
        return isDir;
    }

    public void setDir(boolean dir) {
        isDir = dir;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    @Override
    public String toString() {
        return "PathDto{" +
                "fileName='" + fileName + '\'' +
                ", filePath='" + filePath + '\'' +
                '}';
    }

    @Override
    public int compareTo(PathDto o) {
        return this.fileName.compareTo(o.fileName);
    }
}
