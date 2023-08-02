package com.reboot.intobook.history;

import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@Api(tags = "History API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/history")
public class HistoryController {

}

