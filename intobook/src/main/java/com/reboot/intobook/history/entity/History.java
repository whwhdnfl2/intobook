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
@Builder
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

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    private long readingTime;

    private int pageAmount;

    private int pressure;

    private String comment;

    public void updateHistoryCommentAndStartTimeAndEndTimeAndReadingTime( String comment, LocalDateTime startTime, LocalDateTime endTime){
        this.comment = comment;
        if (startTime != null) this.startTime = startTime;
        if (endTime != null) this.endTime = endTime;
        if (this.endTime != null && (startTime != null || endTime != null)) this.readingTime = ChronoUnit.MINUTES.between(this.startTime, this.endTime);
    }


    @PrePersist
    @PreUpdate
    private void cutStartSecond() {
        if (startTime != null) {
            startTime = startTime.withSecond(0).withNano(0); // 분 단위로 절사
        }else {
            startTime = LocalDateTime.now().withSecond(0).withNano(0);
        }
        if (endTime != null) {
            endTime = endTime.withSecond(0).withNano(0); // 분 단위로 절사
        }
    }

    public void updateEndTimeAndReadingTime(){
        LocalDateTime now = LocalDateTime.now();
        this.endTime = now;
        this.readingTime = ChronoUnit.MINUTES.between(this.startTime, now);
    }

    public void updatePressureAndPageAmount(int pressure, int pageAmount){
        this.pressure = pressure;
        this.pageAmount = pageAmount;
    }



}
