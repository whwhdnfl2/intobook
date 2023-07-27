package com.reboot.intobook.book.dto;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.PastOrPresent;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Positive;
import javax.validation.constraints.PositiveOrZero;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SaveReqDto {
    @NotNull
    @Pattern(regexp = "^(\\d{10}|\\d{13})$")
    private String isbn;
    @NotNull
    private String title;

    @NotNull
    private String author;
    private String publisher;
    @Positive(message = "페이지는 양수이어야 합니다")
    private int page;
    private String description;
    private String coverImage;

    @PositiveOrZero(message = "가격은 양수이거나 0이어야 합니다")
    private int price;

    @Positive(message = "책 무게는 양수이어야 합니다")
    private int weight;

}
