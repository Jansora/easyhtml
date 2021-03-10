package com.jansora.easyhtml.utils;

import com.jansora.easyhtml.dto.PathDto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.ObjectUtils;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.function.Predicate;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Configuration
public class FileUtils {

    @Value("${module.http-prefix:/}")
    private String httpPrefix;

    @Value("${module.base-path:/}")
    private String basePath;

    public static Predicate<Path> defaultFilter =  path -> {

        if (path.getFileName().toString().startsWith(".")) {
            return false;
        }
        if (path.getFileName().toString().endsWith(".html")) {
            return true;
        }
        if (path.toFile().isDirectory()) {
            return true;
        }
        return false;
    };



    /**
     * 目录, 文件, 所有
     */
    public enum ListMode {
        Folder, File, All,
    }



    /**
     * 获取当前目录下目录
     * @param dir 目录
     * @param mode 展示方式
     * @return
     */
    public List<PathDto> listDir(String dir, ListMode mode) {

        Predicate<Path> predicate = file -> {
            switch (mode) {
                case Folder:
                    return  Files.isDirectory(file);
                case File:
                    return  !Files.isDirectory(file);
                default:
                    return true;
            }
        };
        return listDir(dir, predicate);

    }
    /**
     * 获取当前目录下目录
     * @param dir 目录
     * @param recursion 是否递归
     * @param predicates 过滤项
     * @return
     */
    @SafeVarargs
    public final List<PathDto> listDir(String dir, boolean recursion, Predicate<Path>... predicates) {

        List<PathDto> paths = listDir(dir, predicates);
        if (recursion) {
            for (PathDto path: paths) {
                if (path.isDir()) {
                    path.setChildren(listDir(path.getFilePath(), true, predicates));
                }

            }
        }

        return paths;

    }
    /**
     * 获取当前目录下目录
     * @param dir 目录路径
     * @param predicates 过滤项
     * @return
     */
    @SafeVarargs
    public final List<PathDto> listDir(String dir, Predicate<Path>... predicates) {
        Stream<Path> stream = null;
        try {
            stream = Files.list(Paths.get(dir));
            for (Predicate<Path> predicate : predicates) {
                stream = stream.filter(predicate);
            }
            return stream
                    .map(path -> new PathDto(path.getFileName().toString(),
                            path.toFile().isDirectory() ? path.toFile().toString() : path.toString().replace(basePath, httpPrefix),
                            path.toFile().isDirectory()))
                    .sorted()
                    .collect(Collectors.toList());
        } catch (IOException e) {
            e.printStackTrace();
        }
        finally {
            if (!ObjectUtils.isEmpty(stream)) {
                stream.close();
            }
        }
        return new ArrayList<>();
    }

}
