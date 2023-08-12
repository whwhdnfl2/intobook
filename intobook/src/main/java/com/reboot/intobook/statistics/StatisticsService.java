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
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.*;
import java.time.temporal.ChronoUnit;
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

        // 주차별 갯수를 저장하는 List<int[]> 생성
        List<int[]> weekCountsList = new ArrayList<>();

        // 주차별 갯수 계산
        LocalDateTime baseDateTime = findNWeekLastestHistoryList.get(0).getStartTime();

        for (History h : findNWeekLastestHistoryList) {
            LocalDateTime dateTime = h.getStartTime();
            LocalDate date = dateTime.toLocalDate();

            boolean dummy = h.getUser() == null ? true : false; // 개수 보정을 위한 더미인지 확인 flag
            int dayIndex = date.getDayOfWeek().getValue() - 1; // 월요일부터 시작하도록 보정
            int weekIndex = (int) (baseDateTime.toLocalDate().until(date, ChronoUnit.WEEKS));

            while (weekIndex >= weekCountsList.size()) {
                weekCountsList.add(new int[7]);
            }

            if( !dummy ) {
                weekCountsList.get(weekIndex)[dayIndex]++;
            }
        }

        return GetNWeeksReadResponse.builder()
                .weeks(weekCountsList).build();
    }

    private List<History> getHistoryBeforeNWeeks( List<History> findHistoryList, int weekCnt ) {
        LocalDate NWeeksAgo = LocalDate.now().minusWeeks( weekCnt - 1 );
        int weekDay = NWeeksAgo.getDayOfWeek().getValue(); // 1~7까지

        // 기준이 되는 날짜: n주 전 일요일
        LocalDate NWeeksAgoSunday = NWeeksAgo.minusDays(weekDay);

        List<History> filteredHistoryList = new ArrayList<>();
        for (History history : findHistoryList) {
            if ( NWeeksAgoSunday.isBefore( history.getStartTime().toLocalDate()) ) {
                filteredHistoryList.add(history);
            }
        }

        // 날짜 오름차순 정렬
        filteredHistoryList.sort( (h1, h2) -> h1.getStartTime().compareTo(h2.getStartTime()) );

        // 데이터 개수 적을 때, 개수 보정 dummy data
        LocalDateTime first = filteredHistoryList.get(0).getStartTime();
        int before = first.getDayOfWeek().getValue(); // 1 2 3 4 5 6 7
        for (int i = 0; i < before; i++) {
            LocalDateTime tmp = first.minusDays(i);
            filteredHistoryList.add(0, History.builder().startTime(tmp).build());
        }

        return filteredHistoryList;
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

        double multiRead = getMultiRead(recent10HistoryList);

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

    private double getMultiRead(List<History> recent10HistoryList) {
        Set<String> bookSet = new HashSet<>();
        String preBook = "";
        double cnt = 0;
        for (History history : recent10HistoryList) {
            String nowBook = history.getUserBook().getBook().getIsbn();
            bookSet.add(nowBook);
            if (nowBook.equals(preBook)) cnt++;
            preBook = nowBook;
        }

        return Math.round(cnt/bookSet.size()*100)/100.0;
    }

    private boolean getIsBurning(List<History> recent10HistoryList) {
        int l = recent10HistoryList.size();
        for (int i = 7; i < l; i++) {
            LocalDateTime pre = recent10HistoryList.get(i).getStartTime();
            LocalDateTime now = recent10HistoryList.get(i).getStartTime();
            Duration duration = Duration.between(pre, now);
            Duration twoWeeks = Duration.ofDays(14);
            if (duration.compareTo(twoWeeks) < 0) return true;
        }
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
