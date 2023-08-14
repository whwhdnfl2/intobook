package com.reboot.intobook.userbook.entity;

import com.reboot.intobook.book.Book;
import com.reboot.intobook.user.entity.User;
import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Formula;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@RequiredArgsConstructor
@Table( name = "user_book" )
public class UserBook {

    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private Long userBookPk;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "userPk")
    private User user;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "isbn")
    private Book book;

    @ColumnDefault("0")
    private int nowPage;

    @CreationTimestamp
    private LocalDateTime startedAt;

    private LocalDateTime completedAt;

    @ColumnDefault("0")
    @Type(type = "org.hibernate.type.NumericBooleanType")
    private boolean isDeleted;

    @Enumerated(EnumType.STRING)
    @NotNull
    private UserBookStatus status;

    @ColumnDefault("0")
    private int progress;

    @PreUpdate
    private void updateProgress() {
        if (this.book != null && this.book.getPage() != 0) {
            this.progress = (this.nowPage * 100) / this.book.getPage();
        }
        this.progress = Math.max(0, this.progress);
        this.progress = Math.min(100, this.progress);
    }
}