package com.reboot.intobook.history.entity;

import com.reboot.intobook.user.entity.User;
import com.reboot.intobook.userbook.entity.UserBook;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

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

    @CreationTimestamp
    private LocalDateTime startTime;

    private LocalDateTime endTime;

    private long readingTime;

    private int pageAmount;

    private int pressure;

    private String comment;

    // 생성 메서드
    @Builder
    private History(UserBook userBook, User user){
        this.userBook = userBook;
        this.user = user;
    }
    public void updateHistoryCommentAndStartTimeAndEndTimeAndReadingTime( String comment, LocalDateTime startTime, LocalDateTime endTime){
        this.comment = comment;
        this.startTime = startTime;
        this.endTime = endTime;
        this.readingTime = ChronoUnit.MINUTES.between(startTime, endTime);
    }

    public void updateEndTimeAndReadingTime(){
        LocalDateTime now = LocalDateTime.now();
        this.endTime = now;
        this.readingTime = ChronoUnit.MINUTES.between(this.startTime, now);
    }

    public void updatePressure(int pressure){
        this.pressure = pressure;
    }

}
