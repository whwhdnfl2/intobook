package com.reboot.intobook.statistics;

import com.reboot.intobook.history.HistoryRepository;
import com.reboot.intobook.history.entity.History;
import com.reboot.intobook.statistics.dto.GetNWeeksReadResponse;
import com.reboot.intobook.statistics.dto.GetUserBookStatisticResponse;
import com.reboot.intobook.statistics.dto.GetUserStatisticsResponse;
import com.reboot.intobook.userbook.UserBookRepository;
import com.reboot.intobook.userbook.entity.UserBook;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Stack;

@Slf4j
@Service
@RequiredArgsConstructor
public class StatisticsService {
    private final UserBookRepository userBookRepository;
    private final HistoryRepository historyRepository;
    final int MONDAY = 0;
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

    public GetNWeeksReadResponse getNweeksStatistic( int weekCnt, long userPk ) {
        List<History> findHistoryList = historyRepository.findByUserUserPk(userPk);
        List<History> findNWeekLastestHistoryList = getHistoryBeforeNWeeks( findHistoryList, weekCnt );

        Stack<int[]> weeksStack = new Stack<>();
        int[] week = new int[7];

        log.info("==================================================");
        for( History h : findNWeekLastestHistoryList ){
            log.info(  h.getStartTime().toString() );
            int day = h.getStartTime().getDayOfWeek().getValue() - 1;
            week[ day ]++;
            if( day == MONDAY ){
                weeksStack.add(week);
                week = new int[7]; // 배열 초기화
            }
        }

        List<int[]> weeksList = new ArrayList<>();
        for( int[] arr: weeksStack ){
            weeksList.add(arr);
        }

        return GetNWeeksReadResponse.builder()
                .weeks(weeksList).build();
    }

    private List<History> getHistoryBeforeNWeeks( List<History> findHistoryList, int weekCnt ) {
        LocalDateTime NWeeksAgo = LocalDateTime.now().minusWeeks( weekCnt );

        List<History> filteredHistoryList = new ArrayList<>();
        for (History history : findHistoryList) {
            if ( history.getStartTime().isAfter( NWeeksAgo ) ) {
                filteredHistoryList.add(history);
            }
        }

        // 가장 최신 날짜로 정렬
        filteredHistoryList.sort( (h1, h2) -> h2.getStartTime().compareTo(h1.getStartTime()) );

        return filteredHistoryList;
    }

}
