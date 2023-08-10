import { AverageStatistics } from "../components/common";
import {BookCharacter, TotalStatistic, WeeklyStatistic} from './../components/userStatistics';

// const data = [
//     { day: '월', lastweek: 800, thisweek: 30 },
//     { day: '화', lastweek: 520, thisweek: 0 },
//     { day: '수', lastweek: 33, thisweek: 2 },
//     { day: '목', lastweek: 520, thisweek: 100 },
//     { day: '금', lastweek: 4, thisweek: 24 },
//     { day: '토', lastweek: 10, thisweek: 55 },
//     { day: '일', lastweek: 520, thisweek: 1 }
// ];

const StatisticsPage = () => {
    const username = "zaru"

    return (
        <div>
            {username} 님의 독서 유형은..
            <BookCharacter />
            <TotalStatistic />
            <WeeklyStatistic />
            {/* <MyResponsiveBar data={data} /> */}
            <AverageStatistics readingTime={'25'} readSpeed={'31'} />
        </div>
    );
}

export default StatisticsPage;