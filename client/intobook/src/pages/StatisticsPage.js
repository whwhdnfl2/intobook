import BookCharacter from "../components/userStatistics/BookCharacter";

const StatisticsPage = () => {
    const username = "zaru"
 
    return ( 
    <div>
        {username} 님의 통계페이지입니다!
        <BookCharacter/>

    </div>
    );
}

export default StatisticsPage;