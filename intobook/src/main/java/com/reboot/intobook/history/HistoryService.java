package com.reboot.intobook.history;

import com.reboot.intobook.history.entity.History;
import com.reboot.intobook.userbook.UserBookRepository;
import com.reboot.intobook.userbook.entity.UserBook;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class HistoryService {
    private HistoryRepository historyRepository;
    private UserBookRepository userBookRepository;

    @Transactional
    public Long create( Long userBookPk ){
        // 엔티티 조회
        UserBook findUserBook = userBookRepository.findById(userBookPk)
                .orElseThrow(() -> new NoSuchElementException("User Book Not Found Error!!!"));

        // history 생성
        History history = History.builder().userBook(findUserBook).build();

        History save = historyRepository.save(history);
        return save.getHistoryPk();
    }

//    /**
//     * userBook의 history 목록 조회
//     */
//    public List<History> findUserBookHistoryList( Long userBookPk ){
//        return historyRepository.findAllByUserBookPk( userBookPk );
//    }

//    /**
//     * 나의 모든 history 조회
//     */
//    public List<History> findMyHistoryList(){
//        return historyRepository.findBy
//    }


    @Transactional
    public void update( Long historyPk, String comment){
        Optional<History> history = historyRepository.findById(historyPk);
        history.get().updateComment(comment);
    }

    @Transactional
    public void delete( Long historyPk ){
        History findHistory = historyRepository.findById(historyPk).orElseThrow(() -> new NoSuchElementException("History Not Found Error!!!"));

        historyRepository.delete(findHistory);
    }
}
