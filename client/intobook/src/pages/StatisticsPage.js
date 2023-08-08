import { AverageStatistics } from "../components/common";
import {BookCharacter, TotalStatistic, WeeklyStatistic} from './../components/userStatistics';


const StatisticsPage = () => {
    const username = "zaru"

    return (
        <div>
            {username} 오늘도 피그마만 했다.
            <BookCharacter />
            <TotalStatistic />
            <WeeklyStatistic />
            <AverageStatistics readingTime={'25'} readSpeed={'31'} />
        </div>
    );
}

export default StatisticsPage;