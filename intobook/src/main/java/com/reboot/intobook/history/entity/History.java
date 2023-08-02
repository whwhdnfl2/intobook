package com.reboot.intobook.history.entity;

import com.reboot.intobook.userbook.entity.UserBook;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;

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
@RequiredArgsConstructor
public class History {

    @Id @GeneratedValue
    private Long historyPk;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "user_book_pk")
    @NotNull
    private UserBook userBook;

    @CreatedDate
    private LocalDateTime startTime;

    private LocalDateTime endTime;

    @PositiveOrZero
    private int pageAmount;

    private String comment;

    // 생성 메서드
    @Builder
    private History(UserBook userBook){
        this.userBook = userBook;
    }
    public void updateComment( String comment ){
        this.comment = comment;
    }
}
