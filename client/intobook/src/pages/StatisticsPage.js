import { AverageStatistics } from "../components/common";
import {BookCharacter, TotalStatistic, WeeklyStatistic} from './../components/userStatistics';


const StatisticsPage = () => {
    const username = "zaru"

    return (
        <div>
            {username} 님의 독서 유형은..
            <BookCharacter />
            <TotalStatistic />
            <WeeklyStatistic />
            <AverageStatistics readingTime={'25'} readSpeed={'31'} />
        </div>
    );
}

export default StatisticsPage;