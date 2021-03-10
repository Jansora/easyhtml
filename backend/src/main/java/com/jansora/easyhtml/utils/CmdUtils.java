package com.jansora.easyhtml.utils;

import com.jansora.easyhtml.exception.ErrorEnum;
import com.jansora.easyhtml.resp.ResultDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.StringUtils;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.concurrent.Executors;
import java.util.function.Consumer;

/**
 * 读取命令行
 */
public class CmdUtils {
    private static final Logger LOGGER = LoggerFactory.getLogger(CmdUtils.class);

    private static class StreamGobbler implements Runnable {
        private final InputStream inputStream;
        private final Consumer<String> consumer;

        public StreamGobbler(InputStream inputStream, Consumer<String> consumer) {
            this.inputStream = inputStream;
            this.consumer = consumer;
        }

        @Override
        public void run() {
            new BufferedReader(new InputStreamReader(inputStream)).lines().forEach(consumer);
        }
    }
    /**
     * 执行命令并获得输出结果
     * @param cmd 命令
     * @return ResultDto<String>
     */
    public static ResultDto<String> syncRun(String dirPath, String... cmd) {
        try {
            System.out.println("cmd exec dir: " + dirPath + "\n cmd:");
            System.out.println(Arrays.toString(cmd));
            Process process = Runtime.getRuntime().exec(cmd, null, new File(dirPath));

            BufferedReader reader =
                    new BufferedReader(new InputStreamReader(process.getInputStream()));

            StringBuilder  sb = new StringBuilder();
            String line = "";
            while ((line = reader.readLine())!= null) {
                sb.append(line).append("\n");
            }
            int exitCode = process.waitFor();
            boolean status = exitCode == 0;
            ResultDto<String> result = status ? ResultDto.SUCCESS() : ResultDto.FAIL(ErrorEnum.RunCmdError, "exec cmd failed");
            result.setData(sb.toString());
            return result;


        }
        catch (IOException e) {
            LOGGER.error("exec CmdUtils.run failed. IOException:", e);
        }
        catch (InterruptedException e) {
            LOGGER.error("exec CmdUtils.run failed. InterruptedException:", e);
        }
        return ResultDto.FAIL(ErrorEnum.RunCmdError, "exec cmd failed");
    }

    /**
     * 执行命令并获得输出结果
     * @param cmd 命令
     * @return ResultDto<String>
     */
    public static ResultDto<String> syncRunConsumer(String dirPath, Consumer<String>  consumer, String... cmd) {
        try {
            System.out.println("cmd exec dir: " + dirPath + "\n cmd:");
            System.out.println(Arrays.toString(cmd));
            Process process = Runtime.getRuntime().exec(cmd, null, new File(dirPath));

            BufferedReader reader =
                new BufferedReader(new InputStreamReader(process.getInputStream()));

            String line = "";
            while ((line = reader.readLine())!= null) {
                consumer.accept(line);
            }
            int exitCode = process.waitFor();
            boolean status = exitCode == 0;
            return status ? ResultDto.SUCCESS() : ResultDto.FAIL(ErrorEnum.RunCmdError, "exec cmd failed");


        }
        catch (IOException e) {
            LOGGER.error("exec CmdUtils.run failed. IOException:", e);
        }
        catch (InterruptedException e) {
            LOGGER.error("exec CmdUtils.run failed. InterruptedException:", e);
        }
        return ResultDto.FAIL(ErrorEnum.RunCmdError, "exec cmd failed");
    }
    /**
     * 执行命令并获得输出结果
     * @param cmd 命令
     * @return ResultDto<String>
     */
    public static ResultDto<String> syncRun(String dirPath, Consumer<String>  consumer, String... cmd) {
        try {
            System.out.println("cmd exec dir: " + dirPath + "\n cmd:");
            System.out.println(Arrays.toString(cmd));
            Process process = Runtime.getRuntime().exec(cmd, null, new File(dirPath));

            BufferedReader reader =
                    new BufferedReader(new InputStreamReader(process.getInputStream()));

            String line = "";
            while ((line = reader.readLine())!= null) {
                consumer.accept(line);
            }
            int exitCode = process.waitFor();
            boolean status = exitCode == 0;
            ResultDto<String> result = status ? ResultDto.SUCCESS() : ResultDto.FAIL(ErrorEnum.RunCmdError, "exec cmd failed");
            return result;


        }
        catch (IOException e) {
            LOGGER.error("exec CmdUtils.run failed. IOException:", e);
        }
        catch (InterruptedException e) {
            LOGGER.error("exec CmdUtils.run failed. InterruptedException:", e);
        }
        return ResultDto.FAIL(ErrorEnum.RunCmdError, "exec cmd failed");
    }
    /**
     * 异步执行命令
     * @param dirPath 目录
     * @param consumer 消费lambda
     * @param cmd 命令
     */
    public static void asyncRun(String dirPath, Consumer<String>  consumer, String... cmd) {
        try {
            ProcessBuilder builder = new ProcessBuilder();
            System.out.println("cmd exec dir: " + dirPath + "\n cmd:");
            System.out.println(Arrays.toString(cmd));
            if (StringUtils.hasLength(dirPath)) {
                builder.directory(new File(dirPath));
            }

            builder.command(cmd);
            Process process = builder.start();
            StreamGobbler streamGobbler =
                new StreamGobbler(process.getInputStream(), consumer);
            Executors.newSingleThreadExecutor().submit(streamGobbler);
        }
        catch (IOException e) {
            LOGGER.error("exec CmdUtils.run failed. IOException:", e);
        }
    }
}
