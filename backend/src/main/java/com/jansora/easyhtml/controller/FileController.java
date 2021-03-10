package com.jansora.easyhtml.controller;

import com.jansora.easyhtml.dto.PathDto;
import com.jansora.easyhtml.exception.ErrorEnum;
import com.jansora.easyhtml.resp.ResultDto;
import com.jansora.easyhtml.utils.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

@RestController
@RequestMapping("book")
public class FileController {

    @Value("${module.book-paths:/}")
    private String bookPaths;

    @Autowired
    FileUtils fileUtils;

    @GetMapping("ls")
    public ResultDto<List<PathDto>> getBooks() {
        String[] basePathArray = bookPaths.split(",");
        return ResultDto.SUCCESS( Arrays.stream(basePathArray)
                .flatMap(s -> Arrays.stream((bookPaths.split(","))))
                .map(dir -> fileUtils.listDir(dir, false, FileUtils.defaultFilter))
                .flatMap(lst -> lst.stream())
                .collect(Collectors.toList())
        );
//        return ResultDto.SUCCESS(fileUtils.listDir(basePath, false, FileUtils.defaultFilter));
    }
    @GetMapping("chapters")
    public ResultDto<List<PathDto>> getChapters(String bookDir) {
        String[] basePathArray = bookPaths.split(",");

        if (!StringUtils.hasLength(bookDir) ||  Arrays.stream(basePathArray).noneMatch(basePath -> bookDir.startsWith(basePath))) {
            return ResultDto.FAIL(ErrorEnum.NotFound, "参数格式不符和");
        }
        return ResultDto.SUCCESS(fileUtils.listDir(bookDir , true, FileUtils.defaultFilter));
    }
}
