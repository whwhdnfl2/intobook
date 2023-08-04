package com.reboot.intobook.history;

import com.reboot.intobook.history.entity.History;
import com.reboot.intobook.user.entity.User;
import com.reboot.intobook.userbook.entity.UserBook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HistoryRepository extends JpaRepository<History, Long> {
//    History findByUser(User user);
    History findByUserAndUserBook(User user, UserBook userBook);
}
