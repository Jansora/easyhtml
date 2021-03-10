package com.jansora.easyhtml.controller;

import com.jansora.easyhtml.dto.PathDto;
import com.jansora.easyhtml.exception.ErrorEnum;
import com.jansora.easyhtml.resp.ResultDto;
import com.jansora.easyhtml.utils.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("book")
public class FileController {

    @Value("${module.base-path:/}")
    private String basePath;

    @Autowired
    FileUtils fileUtils;

    @GetMapping("ls")
    public ResultDto<List<PathDto>> getBooks() {
        return ResultDto.SUCCESS(fileUtils.listDir(basePath, false, FileUtils.defaultFilter));
    }
    @GetMapping("chapters")
    public ResultDto<List<PathDto>> getChapters(String bookDir) {
        if (!StringUtils.hasLength(bookDir) || !bookDir.startsWith(basePath)) {
            return ResultDto.FAIL(ErrorEnum.NotFound, "参数格式不符和");
        }
        return ResultDto.SUCCESS(fileUtils.listDir(StringUtils.hasLength(bookDir) ? bookDir : basePath, true, FileUtils.defaultFilter));
    }
}
