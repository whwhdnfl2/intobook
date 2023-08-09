import { AverageStatistics } from "../components/common";
import {BookCharacter, TotalStatistic, WeeklyStatistic, MyResponsiveBar} from './../components/userStatistics';



const StatisticsPage = () => {
    const username = "zaru"
    const data = [{country: 'USA', 'hot dog': 25, 'burger': 30, 'sandwitch':40, 'kebab':40, 
    'fries':40, 'donut':40 }];
    console.log(data)

    return (
        <div>
            {username} 님의 독서 유형은..
            <BookCharacter />
            <TotalStatistic />
            <WeeklyStatistic />
            <MyResponsiveBar data={data}  />
            <AverageStatistics readingTime={'25'} readSpeed={'31'} />
        </div>
    );
}

export default StatisticsPage;