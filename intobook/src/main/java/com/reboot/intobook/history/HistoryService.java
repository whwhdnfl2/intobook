package com.reboot.intobook.history;

import com.reboot.intobook.history.entity.History;
import com.reboot.intobook.userbook.UserBookRepository;
import com.reboot.intobook.userbook.entity.UserBook;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class HistoryService {
    private HistoryRepository historyRepository;
    private UserBookRepository userBookRepository;

//    @Transactional
//    public Long create( String email ){
//        // 엔티티 조회
////        UserBook userBook = userBookRepository.findByEmail(email);
//        // history 생성
//        History history = History.builder()
//                .userBook()
//
//        History save = historyRepository.save(history);
//        return save.getHistoryPk();
//    }

    @Transactional
    public void update( Long historyPk, String comment){
        Optional<History> history = historyRepository.findById(historyPk);
        history.get().updateComment(comment);
    }


}
