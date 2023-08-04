package com.reboot.intobook.history;

import com.reboot.intobook.book.Book;
import com.reboot.intobook.book.BookRepository;
import com.reboot.intobook.history.entity.History;
import com.reboot.intobook.user.entity.User;
import com.reboot.intobook.user.repository.UserRepository;
import com.reboot.intobook.userbook.UserBookRepository;
import com.reboot.intobook.userbook.entity.UserBook;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class HistoryService {
    private final HistoryRepository historyRepository;
    private final UserBookRepository userBookRepository;
    private final UserRepository userRepository;
    private final BookRepository bookRepository;

    @Transactional
    public Long create( Long userBookPk ) throws Exception {
        // 필요한 요소 조회
        UserBook findUserBook = userBookRepository.findById(userBookPk)
                .orElseThrow(() -> new NoSuchElementException("User Book Not Found Error!!!"));
        User findUser = findUserBook.getUser();

        // 책장에 이미 넣은 책일 때, 걸러내기
        History alreadyExist = historyRepository.findByUserAndUserBook(findUser, findUserBook);
        if( alreadyExist != null ){
            // FIXME: add exception handling
            return -1L;
        }

        // history 생성
        History history = History.builder()
                .userBook(findUserBook)
                .user(findUser)
                .build();

        // history 저장
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
    public void update( Long historyPk, String comment ){
        Optional<History> history = historyRepository.findById(historyPk);
        history.get().updateComment(comment);
    }

    @Transactional
    public void delete( Long historyPk ){
        History findHistory = historyRepository.findById(historyPk).orElseThrow(() -> new NoSuchElementException("History Not Found Error!!!"));

        historyRepository.delete(findHistory);
    }
}
