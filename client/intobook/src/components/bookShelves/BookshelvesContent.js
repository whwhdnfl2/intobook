import { useEffect } from 'react';
import {userbooks} from './../../api/userbookApi';

const BookshelvesContent = () => {
    
    useEffect(() => {
        const fetchUserBooks = async () => {
            try {
                const res = userbooks('createdAt',0,'INTEREST')
                console.log("객체 받아오기",res)
            } catch (error) {
                console.error("에러발생:",error)
            }
        };

        fetchUserBooks();
    },[]);

    return ( 
        <div>

        </div>
     );
}
 
export default BookshelvesContent;