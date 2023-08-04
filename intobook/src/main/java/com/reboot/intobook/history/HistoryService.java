package com.reboot.intobook.history;

import com.reboot.intobook.book.Book;
import com.reboot.intobook.book.BookRepository;
import com.reboot.intobook.history.dto.GetHistoryListResponse;
import com.reboot.intobook.history.dto.GetHistoryResponse;
import com.reboot.intobook.history.entity.History;
import com.reboot.intobook.user.entity.User;
import com.reboot.intobook.user.repository.UserRepository;
import com.reboot.intobook.userbook.UserBookRepository;
import com.reboot.intobook.userbook.entity.UserBook;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

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

        // history 생성
        History history = History.builder()
                .userBook(findUserBook)
                .user(findUser)
                .build();

        // history 저장
        History save = historyRepository.save(history);
        return save.getHistoryPk();
    }

    /**
     * userBook의 history 목록 조회
     */
    public GetHistoryListResponse findUserBookHistoryList(Long userBookPk, int page ){
        // userBook 조회
        UserBook findUserBook = userBookRepository.findById(userBookPk)
                        .orElseThrow(() -> new NoSuchElementException("User Book Not Found Error!!!"));

        Page<History> histories = historyRepository.findByUserBook( findUserBook, PageRequest.of( page, 20, Sort.by("startTime")));
        List<GetHistoryResponse> items = histories.stream().map( history -> {
            return new GetHistoryResponse(
                    history.getStartTime(),
                    history.getEndTime(),
                    history.getComment(),
                    history.getPageAmount()
            );
        }).collect(Collectors.toList());

        return GetHistoryListResponse.builder()
                .items(items)
                .pageStart(page)
                .pageSize(20)
                .totalCount(histories.getTotalElements())
                .build();
    }

//    /**
//     * 나의 모든 history 조회
//     */
//    public List<History> findMyHistoryList(){
//        return historyRepository.findByUser()
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
