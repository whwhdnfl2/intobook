package com.reboot.intobook.statistics;

import com.reboot.intobook.history.HistoryRepository;
import com.reboot.intobook.history.entity.History;
import com.reboot.intobook.statistics.dto.GetAttentionStatisticsResponse;
import com.reboot.intobook.statistics.dto.GetNWeeksReadResponse;
import com.reboot.intobook.statistics.dto.GetUserBookStatisticResponse;
import com.reboot.intobook.statistics.dto.GetUserStatisticsResponse;
import com.reboot.intobook.statistics.entity.ActiveTime;
import com.reboot.intobook.statistics.entity.Jenre;
import com.reboot.intobook.statistics.entity.WeekDay;
import com.reboot.intobook.userbook.UserBookRepository;
import com.reboot.intobook.userbook.entity.UserBook;
import com.reboot.intobook.userbook.entity.UserBookStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.*;
import java.time.temporal.ChronoUnit;
import java.time.temporal.TemporalAdjusters;
import java.util.*;

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

        // totalReadBook, totalReadPage 계산
        int totalReadPage = 0;
        int totalReadBook = 0;
        for( UserBook ub: userBookList ){
            totalReadPage += ub.getNowPage();
            // 완독한 책만 더해줌
            if (ub.getStatus() == UserBookStatus.COMPLETE) totalReadBook += 1;
        }

        //maxReadSequence 계산
        int maxReadDaysInRow = findMaxReadDaysInRow( historyList );

        // totalReadTime 계산
        int totalReadTime = 0;
        for( History h: historyList ){
            totalReadTime += (int) h.getReadingTime();
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
                .totalReadBook( totalReadBook )
                .maxReadDaysInRow( maxReadDaysInRow )
                .totalReadPage( totalReadPage )
                .totalReadTime( totalReadTime )
                .pagePerHour( pagePerHour )
                .timePerRead( timePerRead )
                .build();
    }

    private int findMaxReadDaysInRow(List<History> historyList) {
        if (historyList == null || historyList.isEmpty()) {
            return 0;
        }
        int maxCon = 1;
        int tempCon = 1;
        LocalDate pre = historyList.get(0).getStartTime().toLocalDate();
        int l = historyList.size();
        LocalDate now;
        for (int i = 1; i < l; i++) {
            now = historyList.get(i).getStartTime().toLocalDate();
            Duration difference = Duration.between(pre.atStartOfDay(), now.atStartOfDay());
            System.out.println("지금 : " + now + " 이전 : " + pre + " 차이 : " + difference.toDays());
            if (difference.toDays() == 1) {
                tempCon++;
                maxCon = Math.max(maxCon, tempCon);
            }else if (difference.toDays() > 1){
                tempCon = 1;
            }
            pre = now;
        }
        return maxCon;
    }

    public GetUserBookStatisticResponse getUserBookStatistics(Long userBookPk) {
        // 엔티티 조회
        UserBook findUserBook = userBookRepository.findById(userBookPk)
                .orElseThrow(() -> new NoSuchElementException("Member Not Found"));

        List<History> findHistoryList = historyRepository.findAllByUserBookUserBookPk(userBookPk)
                .orElseThrow(() -> new NoSuchElementException("History List Not Found"));
        if (findHistoryList.isEmpty()) {
            return null;
        }
        // TODO: 값 채우는 로직 정교화하기
        int userBookReadPages = findUserBook.getNowPage();
        int userBookPages = findUserBook.getBook().getPage();

        long maxReadingTime = 0;
        long totalReadingTime = 1;
        long averageReadingTime = 0;

        for( History history: findHistoryList){
            totalReadingTime += (int) history.getReadingTime();
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

    public GetNWeeksReadResponse getWeeksStatistic( long userPk ) {
        List<History> findHistoryList = historyRepository.findByUserUserPk(userPk);

        // 주차별 갯수를 저장하는 List<int[]> 생성
        int[][] weekCountsList = new int[2][7];

        LocalDate today = LocalDate.now();
        LocalDate lastMonday = (today.minusDays(6)).with(TemporalAdjusters.previous(DayOfWeek.MONDAY));
        LocalDate tempDay = lastMonday;
        for (History history : findHistoryList) {
            int diff = (int)ChronoUnit.DAYS.between(lastMonday, history.getStartTime().toLocalDate());
            if (diff < 0 || diff >= 14) continue;
            weekCountsList[diff/7][diff%7] += history.getReadingTime();
        }

        return GetNWeeksReadResponse.builder()
                .weeks(weekCountsList).build();
    }


    public Long countHistory(Long userPk) {
        return historyRepository.countByUserUserPk(userPk);
    }

    public GetAttentionStatisticsResponse getAttentionStatistics(Long userPk) {
        // 필요한 엔티티 조회
        List<History> recent10HistoryList = historyRepository.findTop10ByUserUserPkOrderByHistoryPkDesc(userPk);
        Collections.reverse(recent10HistoryList);

        List<UserBook> findUserBookList = userBookRepository.findByUserUserPk(userPk);

        // 하나씩 통계 만들기
        int attention = getCountOver30MinAttention(recent10HistoryList);

        boolean multiRead = getMultiRead(recent10HistoryList);

        boolean isBurning = getIsBurning(recent10HistoryList);
        
        WeekDay mostActiveWeekDay = getMostActiveWeekDay(recent10HistoryList);
        
        ActiveTime mostActiveTime = getMostActiveTime(recent10HistoryList);
        
        Jenre favoriteGenre = getFavoriteGenre(findUserBookList);

        return GetAttentionStatisticsResponse.builder()
                .attention(attention)
                .multiRead(multiRead)
                .isBurning(isBurning)
                .mostActiveWeekDay(mostActiveWeekDay)
                .mostActiveTime(mostActiveTime)
                .favoriteGenre(favoriteGenre)
                .build();
    }

    private int getCountOver30MinAttention(List<History> recent10HistoryList) {
        int count = 0;
        for( History history: recent10HistoryList ){
            if( history.getReadingTime() >= 30 ) count++;
        }
        return count;
    }

    private boolean getMultiRead(List<History> recent10HistoryList) {
        Set<String> bookSet = new HashSet<>();
        String preBook = "";
        double cnt = 0;
        for (History history : recent10HistoryList) {
            String nowBook = history.getUserBook().getBook().getIsbn();
            if (history.getUserBook().getStatus() == UserBookStatus.COMPLETE){
                bookSet.add(nowBook);
            }
            if (nowBook.equals(preBook)) cnt++;
            preBook = nowBook;
        }
        bookSet.add(recent10HistoryList.get(9).getUserBook().getBook().getIsbn());
        if (bookSet.isEmpty()) return false;
        return Math.round(cnt/bookSet.size()) < 1.8;
    }

    private boolean getIsBurning(List<History> recent10HistoryList) {
        int l = recent10HistoryList.size();
        LocalDateTime now = LocalDateTime.now();
        int cnt = 0;
        for (int i = 0; i < l; i++) {
            LocalDateTime pre = recent10HistoryList.get(i).getStartTime();
            Duration duration = Duration.between(pre, now);
            Duration twoWeeks = Duration.ofDays(10);
            if (duration.compareTo(twoWeeks) < 0) cnt++;
        }
        if (cnt >= 7) return true;
        return false;
    }

    private WeekDay getMostActiveWeekDay(List<History> findHistoryList) {
        int weekActive[] = new int[8]; // 1: MON, 2: TUE, 3: WED ...
        int maxValue = 0;
        int maxIdx = 0;
        for( History history: findHistoryList ){
            // weekActive 계산하기
            int idx = history.getStartTime().getDayOfWeek().getValue();
            weekActive[idx]++;
            if (maxValue <= weekActive[idx]) {
                maxIdx = idx;
                maxValue = weekActive[idx];
            }
        }
        return WeekDay.values()[maxIdx-1];
    }

    private ActiveTime getMostActiveTime(List<History> findHistoryList) {
        int timeActive[] = new int[ ActiveTime.values().length ];
        int maxValue = 0;
        int maxIdx = 0;
        int idx;
        for( History history: findHistoryList ){
            // timeActive 계산하기
            int hour = history.getStartTime().toLocalTime().getHour();
            idx = hour / 6;
            timeActive[idx]++;
            if (timeActive[idx] >= maxValue) {
                maxValue = timeActive[idx];
                maxIdx = idx;
            }

        }
        return ActiveTime.values()[maxIdx];
    }



    private Jenre getFavoriteGenre(List<UserBook> findUserBookList) {
        int[] jenreActive = new int[ Jenre.values().length ];
        int maxIdx = 0;
        int maxValue = 0;
        for (UserBook userBook : findUserBookList) {
            String isbn = userBook.getBook().getIsbn();
            int jenreNum = isbn.charAt(isbn.length()-3) - '0';
            jenreActive[jenreNum]++;
            if (jenreActive[jenreNum] > maxValue) {
                maxIdx = jenreNum;
                maxValue = jenreActive[jenreNum];
            }
        }
        return Jenre.values()[maxIdx];
    }

}
