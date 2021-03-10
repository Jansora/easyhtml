package com.jansora.easyhtml.controller;

import com.jansora.easyhtml.dto.PathDto;
import com.jansora.easyhtml.resp.ResultDto;
import com.jansora.easyhtml.utils.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("file")
public class FileController {

    @Value("${module.base-path:/}")
    private String basePath;

    @Autowired
    FileUtils fileUtils;

    @GetMapping("/ls")
    public ResultDto<List<PathDto>> listDir() {
        return ResultDto.SUCCESS(fileUtils.listDir(basePath, true, FileUtils.defaultFilter));
    }

}
