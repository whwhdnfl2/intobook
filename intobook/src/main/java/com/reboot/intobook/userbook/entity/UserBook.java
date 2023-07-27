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

    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private Long userBookPk;

    @NotNull
    private Long userPk;

    @NotNull
    private String isbn;

    @ColumnDefault("0")
    private int nowPage;

    @Column(columnDefinition = "default(now())")
    @CreationTimestamp
    private Date createdAt;

    private Date startedAt;

    private Date completedAt;

    @ColumnDefault("0")
    @Type(type = "org.hibernate.type.NumericBooleanType")
    private boolean isDeleted;

    @Enumerated(EnumType.STRING)
    @NotNull
    private UserBookStatus status;
}
