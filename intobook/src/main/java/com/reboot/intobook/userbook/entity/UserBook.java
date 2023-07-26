package com.reboot.intobook.userbook.entity;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@RequiredArgsConstructor
@Table( name = "user_book" )
public class UserBook {

    @Id @Column(name = "user_book_pk") @GeneratedValue(strategy = GenerationType.AUTO)
    private Long userBookPk;

    @Column( name = "user_pk")
    @NotNull
    private Long userPk;

    @Column( name = "isbn")
    @NotNull
    private String isbn;

    @Column(name = "now_page")
    @ColumnDefault("0")
    private int nowPage;

    @Column(name = "created_at", columnDefinition = "default(now())")
    @CreationTimestamp
    private Date createdAt;

    @Column(name = "started_at")
    private Date startedAt;

    @Column(name = "completed_at")
    private Date completedAt;

    @Column(name = "is_deleted")
    @ColumnDefault("0")
    @Type(type = "org.hibernate.type.NumericBooleanType")
    private boolean isDeleted;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    @NotNull
    private UserBookStatus status;
}
