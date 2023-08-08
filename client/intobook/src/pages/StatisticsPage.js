import BookCharacter from "../components/userStatistics/BookCharacter";

const StatisticsPage = () => {
    const username = "zzarru"
 
    return ( 
    <div>
        {username} 오늘도 피그마만 했다.
        <BookCharacter/>

    </div>
    );
}

export default StatisticsPage;