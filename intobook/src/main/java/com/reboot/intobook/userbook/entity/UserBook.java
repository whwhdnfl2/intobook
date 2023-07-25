package com.reboot.intobook.userbook.entity;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table( name = "user_book" )
public class UserBook {

    @Id @Column(name = "user_book_pk") @GeneratedValue(strategy = GenerationType.AUTO)
    private Long userBookPk;

    @Column(name = "now_page",
            columnDefinition = "integer default 0")
    private int nowPage;

    @Column(name = "created_at",
            columnDefinition = "TIMESTAMP DEFAULT NOW()")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @Column(name = "started_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date startedAt;

    @Column(name = "completed_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date completedAt;

    @Column(name = "is_deleted",
            columnDefinition = "TINYINT DEFAULT 0")
    @Type(type = "org.hibernate.type.NumericBooleanType")
    private boolean isDeleted;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    @NotNull
    private UserBookStatus status;
}
