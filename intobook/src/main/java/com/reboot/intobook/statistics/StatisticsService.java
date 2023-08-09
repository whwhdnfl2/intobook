package com.reboot.intobook.statistics;

import com.reboot.intobook.history.HistoryRepository;
import com.reboot.intobook.history.dto.GetHistoryResponse;
import com.reboot.intobook.history.entity.History;
import com.reboot.intobook.statistics.dto.GetUserBookStatisticResponse;
import com.reboot.intobook.statistics.dto.GetUserStatisticsResponse;
import com.reboot.intobook.userbook.UserBookRepository;
import com.reboot.intobook.userbook.entity.UserBook;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class StatisticsService {
    private final UserBookRepository userBookRepository;
    private final HistoryRepository historyRepository;
    public GetUserStatisticsResponse getUserStatic(Long userPk ){
        // 유저의 userBookList 구하기
        List<UserBook> userBookList = userBookRepository.findByUserUserPk(userPk);
        // 유저의 historyList 구하기
        List<History> historyList = historyRepository.findByUserUserPk(userPk);

        // totalReadPage 계산
        int totalReadPage = 0;
        for( UserBook ub: userBookList ){
            totalReadPage += ub.getNowPage();
        }

        //maxReadSequence 계산
        int maxReadDaysInRow = findMaxReadDaysInRow( historyList );

        // totalReadTime 계산
        int totalReadTime = 0;
        for( History h: historyList ){
            totalReadTime += h.getReadingTime();
        }

        // pagePerHour 계산
        int pagePerHour = 0;
        if( totalReadTime != 0 ){ // divide by 0 방지
            pagePerHour = totalReadPage / totalReadTime;
        }

        // timePerRead  계산
        int timePerRead = 0;
        if(historyList.size() != 0 ){
            timePerRead = totalReadTime / historyList.size();
        }

        return GetUserStatisticsResponse.builder()
                .totalReadBook( userBookList.size() )
                .maxReadDaysInRow( maxReadDaysInRow )
                .totalReadPage( totalReadPage )
                .totalReadTime( totalReadTime )
                .pagePerHour( pagePerHour )
                .timePerRead(timePerRead)
                .build();
    }

    private int findMaxReadDaysInRow(List<History> historyList) {
        if (historyList == null || historyList.isEmpty()) {
            return 0;
        }
        //TODO: 추후에 연속된 최대 읽은 날짜 로직 추가하기

        return 2;
    }

    public GetUserBookStatisticResponse getUserBookStatistics(Long userBookPk) {
        // 엔티티 조회
        UserBook findUserBook = userBookRepository.findById(userBookPk)
                .orElseThrow(() -> new NoSuchElementException("Member Not Found"));

        List<History> findHistoryList = historyRepository.findAllByUserBookUserBookPk(userBookPk)
                .orElseThrow(() -> new NoSuchElementException("History List Not Found"));

        // TODO: 값 채우는 로직 정교화하기 & divide by zero 막기 로직 추가
        int userBookReadPages = findUserBook.getNowPage();
        int userBookPages = findUserBook.getBook().getPage();

        long maxReadingTime = 0;
        long totalReadingTime = 1;
        long averageReadingTime = 0;

        for( History history: findHistoryList){
            totalReadingTime += history.getReadingTime();
            maxReadingTime = Math.max(maxReadingTime, history.getReadingTime());
        }
        averageReadingTime = totalReadingTime / findHistoryList.size();

        double averageSpeed = userBookReadPages / totalReadingTime;

        long remainingTime = (long) (( userBookPages - userBookReadPages ) / averageSpeed);


        return GetUserBookStatisticResponse.builder()
                .userBookReadPages(userBookReadPages)
                .userBookPages(userBookPages)
                .startedAt(findUserBook.getStartedAt())
                .maxReadingTime(maxReadingTime)
                .totalReadingTime(totalReadingTime)
                .averageReadingTime(averageReadingTime)
                .remainingTime(remainingTime)
                .userBookStatus(findUserBook.getStatus())
                .averageSpeed(averageSpeed)
                .completedAt(findUserBook.getCompletedAt()).build();
    }
}
