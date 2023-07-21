import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
@Data
@AllArgsConstructor
@Entity
// @Entity로 엔티티 지정 및 이름 설정 가능
public class Member {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    // @Id를 통해 PK 설정, @GeneratedValue autoincrement 설정
    private long id;
    @Column
    private String name;
    @Column
    private int age;
    // @Column을 통해 컬럼 설정(필수 아님)
    // @Column(name="age")로 이름 설정 가능
    public Member(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public Member() {
        
    }
}