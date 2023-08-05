package com.reboot.intobook.history.entity;

import com.reboot.intobook.book.Book;
import com.reboot.intobook.user.entity.User;
import com.reboot.intobook.userbook.entity.UserBook;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import javax.validation.constraints.Future;
import javax.validation.constraints.FutureOrPresent;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PositiveOrZero;
import java.time.LocalDateTime;

import static javax.persistence.FetchType.LAZY;

@Getter
@Entity
@NoArgsConstructor(access =  AccessLevel.PROTECTED)
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class History {

    @Id @GeneratedValue
    private Long historyPk;

    @NotNull
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "user_book_pk")
    private UserBook userBook;

    // 특정 유저의 가장 최근 히스토리 조회로직으로 추가,,,
    @NotNull
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "user_pk")
    private User user;

    @CreatedDate
    private LocalDateTime startTime;

    private LocalDateTime endTime;

    private int pageAmount;

    private int pressure;

    private String comment;

    // 생성 메서드
    @Builder
    private History(UserBook userBook, User user){
        this.userBook = userBook;
        this.user = user;
    }
    public void updateComment( String comment ){
        this.comment = comment;
    }

    public void updateEndTime(LocalDateTime endTime){
        this.endTime = endTime;
    }

    public void updatePressure(int pressure){
        this.pressure = pressure;
    }

}
