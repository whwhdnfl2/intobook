import { AverageStatistics } from "../components/common";
import BookCharacter from "../components/userStatistics/BookCharacter";

const StatisticsPage = () => {
    const username = "zaru"

    // API 통신으로 readingTime, readSpeed 값 받아서 props로 넘겨주기

    return (
        <div>
            {username} 오늘도 피그마만 했다.
            <BookCharacter />
            <AverageStatistics readingTime={'25'} readSpeed={'31'} />

        </div>
    );
}

export default StatisticsPage;