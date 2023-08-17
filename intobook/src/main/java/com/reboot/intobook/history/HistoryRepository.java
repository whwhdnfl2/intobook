package com.reboot.intobook.history;

import com.reboot.intobook.history.dto.GetHistoryResponse;
import com.reboot.intobook.history.entity.History;
import com.reboot.intobook.user.entity.User;
import com.reboot.intobook.userbook.entity.UserBook;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface HistoryRepository extends JpaRepository<History, Long> {
//    History findByUser(User user);
    Page<History> findByUserBookAndEndTimeIsNotNull(UserBook userBook, Pageable pageable);
//    h.startTime, h.endTime, h.comment, h.pageAmount

    List<GetHistoryResponse> findByUser(User user);
    List<History> findByUserUserPk(Long userPk);

    History findTop1ByUserOrderByHistoryPkDesc(User user);
    List<History> findTop10ByUserUserPkOrderByHistoryPkDesc(Long userPk);
    Long countByUserUserPk(Long userPk);
    Optional<List<History>> findAllByUserBookUserBookPk(Long userBookPk);
    History findTop1ByUserOrderByEndTimeDesc(User user);

}
