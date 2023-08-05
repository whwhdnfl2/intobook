package com.reboot.intobook.book.dto;

import com.reboot.intobook.userbook.entity.UserBookStatus;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@ToString
@Getter
@NoArgsConstructor
public class BookDetailDto {
    public String isbn;
    public String title;
    public String cover;
    public String author;
    public String description;
    public int page;
    public UserBookStatus status;

    @Builder

    public BookDetailDto(String title, String cover, String author, String isbn, String description, int page, UserBookStatus status) {
        this.title = title;
        this.cover = cover;
        this.author = author;
        this.isbn = isbn;
        this.description = description;
        this.page = page;
        this.status = status;
    }
}
