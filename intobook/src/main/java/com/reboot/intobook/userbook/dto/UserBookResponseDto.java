package com.reboot.intobook.userbook.dto;


import com.reboot.intobook.userbook.entity.UserBook;
import com.reboot.intobook.userbook.entity.UserBookStatus;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.Date;

@Getter
@ToString
@NoArgsConstructor
public class UserBookResponseDto {
    private Long userBookPk;
    private String title;
    private String coverImage;
    private String author;
    private String publisher;
    private int nowPage;
    private LocalDateTime startedAt;
    private LocalDateTime completedAt;
    private UserBookStatus status;
    private int page;
    @Builder
    public UserBookResponseDto(Long userBookPk, String title, String coverImage, String author, String publisher, int nowPage, LocalDateTime startedAt, LocalDateTime completedAt, UserBookStatus status, int page) {
        this.userBookPk = userBookPk;
        this.title = title;
        this.coverImage = coverImage;
        this.author = author;
        this.publisher = publisher;
        this.nowPage = nowPage;
        this.startedAt = startedAt;
        this.completedAt = completedAt;
        this.status = status;
        this.page = page;
    }

    public static UserBookResponseDto toEntity(UserBook userBook) {
        return UserBookResponseDto.builder()
                .userBookPk(userBook.getUserBookPk())
                .title(userBook.getBook().getTitle())
                .coverImage(userBook.getBook().getCoverImage())
                .author(userBook.getBook().getAuthor())
                .publisher(userBook.getBook().getPublisher())
                .nowPage(userBook.getNowPage())
                .startedAt(userBook.getStartedAt())
                .completedAt(userBook.getCompletedAt())
                .status(userBook.getStatus())
                .page(userBook.getBook().getPage())
                .build();
    }
}